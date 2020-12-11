import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import Trader from "../processor/trader"
import { OrdersService } from './orders.service';

@Processor('orders')
export class OrdersProcessor {
  private readonly logger = new Logger(OrdersProcessor.name);

  constructor(
    private readonly ordersService: OrdersService,
  ) { }
  
  @Process('orderAdd')
  orderAdd(job: Job) {
    Trader.addOrder(job.data)
  }

  @Process('orderComplete')
  orderComplete(job: Job) {
    const order = job.data
    // this.logger.debug("orderComplete")
    // this.ordersService.update(order._id, order)
  }
  
  @Process('orderCancel')
  orderCancel(job: Job) {
    const order = job.data
    // this.logger.debug("orderCancel")
    // Trader.cancelOrder(job.data)
    // this.ordersService.update(order._id, order)
  }
}