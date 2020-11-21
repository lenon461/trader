import { Module } from '@nestjs/common';
import { SummonersController } from './summoners.controller';
import { summonersProviders } from './summoners.provider';
import { SummonersService } from './summoners.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SummonersController],
  providers: [SummonersService, ...summonersProviders]
})
export class SummonersModule { }
