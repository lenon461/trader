import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private readonly orderModel: Model<Order>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);

    const order = await createdOrder.save();
    this.doTrade(order);

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

  private readonly logger = new Logger(OrdersService.name);

  private SellOrders = [];
  private BuyOrders = [];

  getBuyOrders() {
    return this.BuyOrders
  }
  getSellOrders() {
    return this.SellOrders
  }
  getOrderBooks() {
    return {
        S: this.getSellOrders(),
        B: this.getBuyOrders()
    }
  }
    // logic
  addOrder(order) {
      let destinationOrders;
      if (order.type == "S") {
          destinationOrders = this.getSellOrders()
      } else {
          destinationOrders = this.getBuyOrders()
      }
      this.logger.debug("addOrder")
      for (let height = destinationOrders.length - 1; height >= 0; height--) {
          const targetOrder = destinationOrders[height];

          if (targetOrder.price === order.price) {
              targetOrder.amount += order.amount;
              break;
          }
          else if (order.type === "S") {
              if (targetOrder.price > order.price) {
                  destinationOrders.splice(height + 1, 0, order)
                  break;
              }
              else if (targetOrder.price < order.price) {
                  continue;
              }
          }
          else if (order.type === "B") {
              if (targetOrder.price < order.price) {
                  destinationOrders.splice(height + 1, 0, order)
                  break;
              }
              else if (targetOrder.price > order.price) {
                  continue;
              }
          }
          else {
              throw new Error("Wrong order Type")
          }
      }
      
      if(destinationOrders.length == 0) {
        destinationOrders.push(order)
      }

  }
  doTrade(order) {
      let buyer, seller;
      if (order.type == "S") {
          this.logger.debug( '매도주문이 들어옴')
          buyer = this.getBuyOrders().pop();
          seller = order;
      } else {
          this.logger.debug( '매수주문이 들어옴')
          seller = this.getSellOrders().pop();
          buyer = order;
      }

      if(!buyer) {
          this.logger.debug( '매수주문이 없음')
          this.addOrder(seller)
      }
      else if(!seller) {
          this.logger.debug( '매도주문이 없음')
          this.addOrder(buyer)
      }
      else if (buyer.price >= seller.price) {
          this.logger.debug( "가격 충족 => 체결")
          if (buyer.amount < seller.amount) {
              this.logger.debug( "buyer 수량 전체 충족 seller 수량 일부 충족")
              buyer.status = "CM"

              seller.amount -= buyer.amount;
              this.doTrade(seller)

          }
          else if (buyer.amount === seller.amount) {
              this.logger.debug( "buyer 수량 전체 충족 seller 수량 전체 충족")
              buyer.status = "CM"
              seller.status = "CM"

          }

          else if (buyer.amount > seller.amount) {
              this.logger.debug( "buyer 수량 일부 충족 seller 수량 전체 충족")
              seller.status = "CM"

              buyer.amount -= seller.amount
              this.doTrade(buyer)
          }
          else {
              throw new Error("가격 조건 오류")
          }
      }
      else if (buyer.price < seller.price) {
          this.logger.debug( "가격 미충족 => 미체결")
          this.addOrder(buyer)
          this.addOrder(seller)
      }
  }

  
}
