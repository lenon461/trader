import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProcessorController } from './processor.controller';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
  controllers: [ProcessorController],
})
export class ProcessorModule { }