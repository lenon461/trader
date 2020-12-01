import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';
import { TradeService } from './trade.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
    private readonly tradeService: TradeService
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);

    const order = await createdOrder.save();
    this.tradeService.doTrade(order);

    return order
  }

  findAll() {
    return this.orderModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  
}
