import e from "express";
import logger from "../util/logger"

export class Trader {

    // 마켓정보
    MKNAME = "TEST"

    //오더북
    private SellOrders = [];
    private BuyOrders = [];

    constructor(MKNAME) {
        this.MKNAME = MKNAME
        this.initializeOrderBook();
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

    // logic
    addOrder(order) {
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

    }
    doTrade(order) {
        let buyer, seller;
        if (order.type == "S") {
            logger('info', '매도주문')
            buyer = this.getBuyOrders().pop();
            seller = order;
        } else {
            logger('info', '매수주문')
            seller = this.getSellOrders().pop();
            buyer = order;
        }

        if(!buyer) {
            logger('info', '매수주문이 없음')
            this.addOrder(seller)
        }
        else if(!seller) {
            logger('info', '매도주문이 없음')
            this.addOrder(buyer)
        }
        else if (buyer.price >= seller.price) {
            logger('info', "가격 충족 => 체결")
            if (buyer.amount < seller.amount) {
                logger('info', "buyer 수량 전체 충족 seller 수량 일부 충족")
                buyer.status = "CM"

                seller.amount -= buyer.amount;
                this.doTrade(seller)

            }
            else if (buyer.amount === seller.amount) {
                logger('info', "buyer 수량 전체 충족 seller 수량 전체 충족")
                buyer.status = "CM"
                seller.status = "CM"
            }

            else if (buyer.amount > seller.amount) {
                logger('info', "buyer 수량 일부 충족 seller 수량 전체 충족")
                seller.status = "CM"

                buyer.amount -= seller.amount
                this.doTrade(buyer)
            }
            else {
                throw new Error("가격 조건 오류")
            }
        }
        else if (buyer.price < seller.price) {
            logger('info', "가격 미충족 => 미체결")
            this.addOrder(buyer)
            this.addOrder(seller)
        }
    }

}