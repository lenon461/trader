import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @InjectQueue('orders') private readonly ordersQueue: Queue,
  ) {}
  
  private readonly logger = new Logger(OrdersController.name);

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.debug("create")
    const order = await this.ordersService.create(createOrderDto);
    this.ordersQueue.add('orderAdd', order)
    return order
  }

  @Delete('')
  async cancelOrder(@Param('id') id: string) {
    const order = await this.ordersService.find(id)
    this.ordersQueue.add('orderCancel', order)
    return 200;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete('all')
  deleteAll() {
    this.logger.debug("deleteAll")
    this.ordersService.deleteAll();
    return 200;
  }
  
  @Get('all')
  findAll() {
    return this.ordersService.findAll();
  }
}
