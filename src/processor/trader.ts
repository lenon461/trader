import e from "express";
import { Logger } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { Queue } from 'bull';
import * as Bull from 'bull';
import {IOrder} from '../orders/interfaces/order.interface'

class Trader {

    private readonly ordersService: OrdersService;
    private readonly ordersQueue: Queue = new Bull('orders', 'redis://127.0.0.1:6379');
    private readonly logger = new Logger(Trader.name);

    // 마켓정보
    MKNAME = "TEST"

    //오더북
    private SellOrderBook: IOrder[][] = []
    private BuyOrderBook: IOrder[][] = [];

    constructor(MKNAME) {
        this.MKNAME = MKNAME
        this.initializeOrderBook();
        this.logger.debug(MKNAME + "Trade init")
    }

    initializeOrderBook() {
        // this.SellOrderBook = [
        //     [{
        //         price: 10,
        //         amount: 10,
        //         type: "B",
        //         status: "GO"
        //     }],
        //     [{
        //         price: 20,
        //         amount: 10,
        //         type: "B",
        //         status: "GO"
        //     }],
        //     [{
        //         price: 30,
        //         amount: 10,
        //         type: "B",
        //         status: "GO"
        //     }],
        //     [   
        //         {
        //             price: 40,
        //             amount: 10,
        //             type: "B",
        //             status: "GO",
        //             memberId: 1,
        //         },{
        //             price: 40,
        //             amount: 20,
        //             type: "B",
        //             status: "GO",
        //             memberId: 2,
        //         }]];
        // this.BuyOrderBook = [
        //     [{
        //         price: 130,
        //         amount: 10,
        //         type: "S",
        //         status: "GO"
        //     }],
        //     [{
        //         price: 120,
        //         amount: 10,
        //         type: "S",
        //         status: "GO"
        //     }],
        //     [{
        //         price: 110,
        //         amount: 10,
        //         type: "S",
        //         status: "GO"
        //     }],
        //     [{
        //         price: 100,
        //         amount: 10,
        //         type: "S",
        //         status: "GO"
        //     }],]
    }

    // getter
    getBuyOrderBook() {
        return this.BuyOrderBook
    }
    getSellOrderBook() {
        return this.SellOrderBook
    }
    getOrderBooks() {
        return {
            S: this.getSellOrderBook().map(orders => orders.map(order => {
                return {price : order.price, amount: order.amount}
            })),
            B: this.getBuyOrderBook().map(orders => orders.map(order => {
                return {price : order.price, amount: order.amount}
            })),
        }
    }

    // visual
    showOrderBooks() {
        const showOrderBook = (ob: IOrder[][]) => {
            return ob.map(orders => {
                if(orders.length !== 0){
                    const t_amount = orders.map(order => Number(order.amount)).reduce((p, c) => p + c, 0)
                    const price = orders[0].price;
                    return {t_amount, price}
                }
            })
        }
        this.logger.debug("==========================================")
        this.logger.debug({
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        })
        return {
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        }
    }

    // public logic
    public addOrder(order: IOrder) {
        
        // const makerOrderBook = order.type === "S" ? this.getBuyOrderBook() : this.getSellOrderBook();
        // const takerOrderBook = order.type === "S" ? this.getSellOrderBook() : this.getBuyOrderBook();
        
        
        this.doTrade(order)

    }
    


    // private logic
    private _addOrder(order: IOrder) {
        const mergeOrderBook = order.type === "S" ? this.getSellOrderBook() : this.getBuyOrderBook();
        const thisOrder = order;
        const flattened = targetOrderBook => [].concat(...targetOrderBook)
        if(flattened(mergeOrderBook).length === 0) {
            mergeOrderBook.push([order])
            return ;
        }
        for (let center = mergeOrderBook.length - 1; center >= 0; center--) {
            const mergeOrders = mergeOrderBook[center]
            if(mergeOrders.length === 0) {
                mergeOrderBook.splice(center, 1)
                continue;
            };
            const mergeOrder = mergeOrders[0];

            
            if (mergeOrder.price === thisOrder.price) {
                
                mergeOrders.unshift(thisOrder)
                return;
            }
            else if (thisOrder.type === "S") {
                if (mergeOrder.price > thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder])
                    return;
                }
                else if (mergeOrder.price < thisOrder.price) {
                    if(center === 0) mergeOrderBook.unshift([thisOrder])
                    continue;
                }
            }
            else if (thisOrder.type === "B") {
                if (mergeOrder.price < thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder])
                    return;
                }
                else if (mergeOrder.price > thisOrder.price) {
                    if(center === 0) mergeOrderBook.unshift([thisOrder])
                    continue;
                }
            }
            else {
                throw new Error("Wrong order Type")
            }
        }

    }
    private doTrade(order: IOrder) {
        const makerOrderBook = order.type === "S" ? this.getBuyOrderBook() : this.getSellOrderBook();
        const flattened = targetOrderBook => [].concat(...targetOrderBook)
        if(flattened(makerOrderBook).length === 0) {
            this.logger.debug( "오더북 비어있음 => 추가")
            this._addOrder(order)
            return;
        }
        const takerOrder = order;
        for (let center = makerOrderBook.length - 1; center >= 0; center--) {
            const makerOrders = makerOrderBook[center]

            if(makerOrders.length === 0) {
                makerOrderBook.splice(center, 1)
                continue;
            };
            for (let index = makerOrders.length - 1; index >= 0; index--) {
            
                const makerOrder = makerOrders[index];
                
                let buyer = order.type === "S" ? makerOrder : order
                let seller = order.type === "S" ? order : makerOrder
                if (buyer.price >= seller.price) {
                    this.logger.debug( "가격 충족 => 체결")
                    if (buyer.amount < seller.amount) {
                        this.logger.debug( "buyer 수량 전체 충족 seller 수량 일부 충족")

                        makerOrder.type === "B" ? makerOrders.splice(index, 1) : null
                        buyer.status = "CM"
                        this.filledOrder(buyer)
                        
                        seller.amount -= buyer.amount;
                        this.filledOrder(seller)
        
                        return ;
        
                    }
                    else if (buyer.amount === seller.amount) {
                        this.logger.debug( "buyer 수량 전체 충족 seller 수량 전체 충족")

                        makerOrders.splice(index, 1) 

                        buyer.status = "CM"
                        seller.status = "CM"

                        this.filledOrder(buyer)
                        this.filledOrder(seller)

                        return ;
                    }
                    else if (buyer.amount > seller.amount) {
                        this.logger.debug( "buyer 수량 일부 충족 seller 수량 전체 충족")

                        makerOrder.type === "S" ? makerOrders.splice(index, 1) : null
                        seller.status = "CM"
                        this.filledOrder(seller)
        
                        buyer.amount -= seller.amount
                        this.filledOrder(buyer)

                        this.doTrade(buyer)
        
                        return ;
                    }
                    else {
                        throw new Error("가격 조건 오류")
                    }
                }
                else if (buyer.price < seller.price) {
                    this.logger.debug( "가격 미충족 => 미체결")
                    this._addOrder(order)
                    return ;
                }

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
