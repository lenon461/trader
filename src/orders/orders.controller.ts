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
  ) { }
  private readonly logger = new Logger(OrdersController.name);


  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const isSaved = await this.ordersService.create(createOrderDto);
  }

  @Get('all')
  async findAll() {
    await this.ordersQueue.add('order', {
      file: 'order.dto',
    });
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
