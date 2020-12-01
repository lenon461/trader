import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ordersProviders } from './orders.provider';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from '../database/database.module';
import { BullModule } from '@nestjs/bull';
import { OrdersProcessor } from './orders.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orders',
    }),
    DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersProcessor, ...ordersProviders]
})
export class OrdersModule { }
