import e from "express";
import { Logger } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { Queue } from 'bull';
import * as Bull from 'bull';

class Trader {

    private readonly ordersService: OrdersService;
    private readonly ordersQueue: Queue = new Bull('orders', 'redis://127.0.0.1:6379');
    private readonly logger = new Logger(Trader.name);

    // 마켓정보
    MKNAME = "TEST"

    //오더북
    private SellOrders = [];
    private BuyOrders = [];

    constructor(MKNAME) {
        this.MKNAME = MKNAME
        this.initializeOrderBook();
        this.logger.debug(MKNAME + "Trade init")
    }

    initializeOrderBook() {
        this.SellOrders = []
        this.BuyOrders = []
    }

    // getter
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

    // visual
    showOrderBooks() {
        console.log("==============")
        console.log({
            S: this.getSellOrders(),
            B: this.getBuyOrders()
        })
    }

    // public logic
    public addOrder(order) {
        this.doTrade(order)
    }
    


    // private logic
    private _addOrder(order) {
        let destinationOrders;
        if (order.type == "S") {
            destinationOrders = this.getSellOrders()
        } else {
            destinationOrders = this.getBuyOrders()
        }

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
    private doTrade(order) {
        let buyer, seller;
        if (order.type == "S") {
            this.logger.debug( '매도주문')
            buyer = this.getBuyOrders().pop();
            seller = order;
        } else {
            this.logger.debug( '매수주문')
            seller = this.getSellOrders().pop();
            buyer = order;
        }

        if(!buyer) {
            this.logger.debug( '매수주문이 없음')
            this._addOrder(seller)
        }
        else if(!seller) {
            this.logger.debug( '매도주문이 없음')
            this._addOrder(buyer)
        }
        else if (buyer.price >= seller.price) {
            this.logger.debug( "가격 충족 => 체결")
            if (buyer.amount < seller.amount) {
                this.logger.debug( "buyer 수량 전체 충족 seller 수량 일부 충족")
                buyer.status = "CM"
                this.filledOrder(buyer)

                seller.amount -= buyer.amount;
                this.filledOrder(seller)

                this.doTrade(seller)

            }
            else if (buyer.amount === seller.amount) {
                this.logger.debug( "buyer 수량 전체 충족 seller 수량 전체 충족")
                buyer.status = "CM"
                seller.status = "CM"
                this.filledOrder(buyer)
                this.filledOrder(seller)
            }

            else if (buyer.amount > seller.amount) {
                this.logger.debug( "buyer 수량 일부 충족 seller 수량 전체 충족")
                seller.status = "CM"
                this.filledOrder(seller)

                buyer.amount -= seller.amount
                this.filledOrder(buyer)

                this.doTrade(buyer)
            }
            else {
                throw new Error("가격 조건 오류")
            }
        }
        else if (buyer.price < seller.price) {
            this.logger.debug( "가격 미충족 => 미체결")
            this._addOrder(buyer)
            this._addOrder(seller)
        }
    }

    async filledOrder(order){
        this.ordersQueue.add('orderComplete', order)
    }

    private cancelOrder() {
        
    }
}

const trader = new Trader('NR')

export default trader
