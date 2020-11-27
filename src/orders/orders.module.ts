import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ordersProviders } from './orders.provider';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders]
})
export class OrdersModule {}
