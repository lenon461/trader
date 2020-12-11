import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';
import Trader from "./trader"

@Controller('processor')
export class ProcessorController {
    constructor(@InjectQueue('orders') private readonly orderQueue: Queue) { }
    private readonly logger = new Logger(ProcessorController.name);

    @Get('orderbook')
    async orderbook() {
        return Trader.showOrderBooks();
    }
    @Get('getorderbook')
    async getorderbook() {
        this.logger.debug(Trader.getOrderBooks())
        return Trader.getOrderBooks();
    }
}