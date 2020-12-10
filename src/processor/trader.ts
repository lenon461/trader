import e from "express";
import { Logger } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { Queue } from 'bull';
import * as Bull from 'bull';
import {Order} from '../orders/interfaces/order.interface'

class Trader {

    private readonly ordersService: OrdersService;
    private readonly ordersQueue: Queue = new Bull('orders', 'redis://127.0.0.1:6379');
    private readonly logger = new Logger(Trader.name);

    // 마켓정보
    MKNAME = "TEST"

    //오더북
    private SellOrders = []
    private BuyOrders = [];

    constructor(MKNAME) {
        this.MKNAME = MKNAME
        this.initializeOrderBook();
        this.logger.debug(MKNAME + "Trade init")
    }

    initializeOrderBook() {
        this.SellOrders = [
            [{
                price: 10,
                amount: 10,
                type: "B",
                status: "GO"
            }],
            [{
                price: 20,
                amount: 10,
                type: "B",
                status: "GO"
            }],
            [{
                price: 30,
                amount: 10,
                type: "B",
                status: "GO"
            }],
            [   
                {
                    price: 40,
                    amount: 10,
                    type: "B",
                    status: "GO",
                    memberId: 1,
                },{
                    price: 40,
                    amount: 20,
                    type: "B",
                    status: "GO",
                    memberId: 2,
                }]];
        this.BuyOrders = [
            [{
                price: 130,
                amount: 10,
                type: "S",
                status: "GO"
            }],
            [{
                price: 120,
                amount: 10,
                type: "S",
                status: "GO"
            }],
            [{
                price: 110,
                amount: 10,
                type: "S",
                status: "GO"
            }],
            [{
                price: 100,
                amount: 10,
                type: "S",
                status: "GO"
            }],]
    }

    // getter
    getBuyOrderBook() {
        return this.BuyOrders
    }
    getSellOrderBook() {
        return this.SellOrders
    }
    getOrderBooks() {
        return {
            S: this.getSellOrderBook(),
            B: this.getBuyOrderBook()
        }
    }

    // visual
    showOrderBooks() {
        this.logger.debug("==============")
        this.logger.debug({
            S: this.getSellOrderBook(),
            B: this.getBuyOrderBook()
        })
    }

    // public logic
    public addOrder(order) {
        this.doTrade(order)
    }
    


    // private logic
    private _addOrder(order) {
        let targetOrderBook;
        if (order.type == "S") {
            targetOrderBook = this.getSellOrderBook()
        } else {
            targetOrderBook = this.getBuyOrderBook()
        }

        for (let height = targetOrderBook.length - 1; height >= 0; height--) {
            const targetOrders = targetOrderBook[height];
            const targetOrder = targetOrders[0];


            if (targetOrder.price === order.price) {
                
                targetOrders.shift(order)
                break;
            }
            else if (order.type === "S") {
                if (targetOrder.price > order.price) {
                    targetOrderBook.push([order])
                    break;
                }
                else if (targetOrder.price < order.price) {
                    continue;
                }
            }
            else if (order.type === "B") {
                if (targetOrder.price < order.price) {
                    targetOrderBook.push([order])
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

    }
    private doTrade(order) {
        
        let targetOrderBook;
        if (order.type == "S") {
            targetOrderBook = this.getSellOrderBook()
        } else {
            targetOrderBook = this.getBuyOrderBook()
        }
        const targetOrders = targetOrderBook[targetOrderBook.length - 1]
        const taker = order;

        for (let index = targetOrders.length - 1; index >= 0; index--) {
        
            const targetOrder = targetOrders[index];
            if(!targetOrder) {
                this.logger.debug('메이커가 없음')
                this._addOrder(taker)
            }
            
            let buyer, seller;
            if (order.type == "S") {
                this.logger.debug('매도주문')
                buyer = targetOrder;
                seller = taker;
            } else {
                this.logger.debug('매수주문')
                seller = targetOrder;
                buyer = taker;
            }

        
            if (buyer.price >= seller.price) {
                this.logger.debug( "가격 충족 => 체결")
                this.logger.debug(buyer.price + '-' +  seller.price)
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

    }

    filledOrder(order){
        this.ordersQueue.add('orderComplete', order)
    }

    private cancelOrder() {
        
    }
}

const trader = new Trader('NR')

export default trader
