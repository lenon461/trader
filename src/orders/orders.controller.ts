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
    @InjectQueue('orders') private readonly ordersQueue: Queue,
    private readonly ordersService: OrdersService
  ) {}

  private readonly logger = new Logger(OrdersController.name);

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.debug("in")
    const order = await this.ordersService.create(createOrderDto);
    await this.ordersQueue.add('order', order);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
