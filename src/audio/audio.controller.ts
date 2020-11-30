import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';

@Controller('audio')
export class AudioController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) { }
    private readonly logger = new Logger(AudioController.name);

    @Post('transcode')
    async transcode() {
        await this.audioQueue.add('transcode', {
            file: 'audio.mp3',
        });
    }
}