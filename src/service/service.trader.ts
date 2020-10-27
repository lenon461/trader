import e from "express";
import logger from "../util/logger"

export class Trader {
    
    // 마켓정보
    MKNAME = "TEST"

    //오더북
    SellOrders = [];
    BuyOrders = [];
    TradeOrders = [];
    
    constructor(MKNAME){
        this.MKNAME = MKNAME
        this.initializeOrderBook();
    }

    initializeOrderBook() {
        const getSellOrders = () => (require("../stub/SellOrders").SellOrders)
        const getBuyOrders = () => (require("../stub/BuyOrders").BuyOrders)

        this.SellOrders = getSellOrders()
        this.BuyOrders = getBuyOrders()
    }
    getBuyOrders() {
        return this.BuyOrders
    }
    getSellOrders() {
        return this.SellOrders
    }
    getTradeOrders() {
        return this.TradeOrders
    }
    getOrderBooks() {
        return {
            B: this.getBuyOrders(),
            S: this.getSellOrders(),
        }
    }
    showOrderBooks(){
        console.log(this.getOrderBooks())
    }
    addOrder(order) {
        if(order.type == "S") {
            this.getSellOrders().push(order)
        } else {
            this.getBuyOrders().push(order)
        }
    }
    addTrade(order) {
        this.getTradeOrders().push(order)
    }
    doTrade(order) {
        if(order.type == "S") {
            this.sellOrder(order)
        } else {
            this.buyOrder(order)
        }
    }

    sellOrder(order) {
        logger('info', '매도주문')
        const buyOrder = this.getBuyOrders().pop();
        const sellOrder = order;
        logger('info', 'maker : ', buyOrder)
        logger('info', 'taker : ', sellOrder)

        if(buyOrder.price >= sellOrder.price){
            logger('info', "매수가격 충족 => 체결")
            if(buyOrder.amount < sellOrder.amount){
                logger('info', "매수수량 전체충족 => 일부체결")
                buyOrder.status = "GO"
                this.addTrade(buyOrder)
                
                sellOrder.amount -= buyOrder.amount;
                this.addOrder(sellOrder)
                
            }
            else if(buyOrder.amount === sellOrder.amount){
                
            }

            else if(buyOrder.amount > sellOrder.amount){
                logger('info', "매수수량 일부미충족 => 일부체결")

                buyOrder.amount -= sellOrder.amount 
                this.addOrder(buyOrder)                
            }
        }
        else if(buyOrder.price < sellOrder.price){
            logger('info', "미체결 => 주문 재등록")
            this.addOrder(buyOrder)
            this.addOrder(sellOrder)
        }

    }

    buyOrder(order) {
        logger('info', '매수주문')
        const sellOrder = this.getSellOrders().pop();
        const buyOrder = order;
        logger('info', 'maker : ', sellOrder)
        logger('info', 'taker : ', buyOrder)
        if(buyOrder.price >= sellOrder.price){
            logger('info', "매수가격 충족 => 체결")
            if(buyOrder.amount < sellOrder.amount){
                logger('info', "매수수량 전체충족 => 일부체결")
                
                sellOrder.status = "GO"
                this.addTrade(sellOrder)

                buyOrder.amount -= sellOrder.amount;
                this.addOrder(buyOrder)
            }
            else if(buyOrder.amount === sellOrder.amount){
                
            }

            else if(buyOrder.amount > sellOrder.amount){
                logger('info', "매수수량 일부미충족 => 일부체결")

                buyOrder.amount -= sellOrder.amount 
                this.addOrder(buyOrder)                
            }
        }
        else if(buyOrder.price < sellOrder.price){
            logger('info', "미체결 => 주문 재등록")
            this.addOrder(sellOrder)
            this.addOrder(buyOrder)
        }

    }



}