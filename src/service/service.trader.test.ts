import test from 'ava';
import logger from "../util/logger"

import { Trader } from "./service.trader"

const trader = new Trader('NR')

logger('red', "========================")

test('GetOB', t => {
	t.truthy(Array.isArray(trader.getBuyOrders()));
	t.truthy(Array.isArray(trader.getSellOrders()));
});

test('addOrder', t => {
	
	const Order1 = {price: 50, amount:3, type: "B", status: "PE"}
	const Order2 = {price: 100, amount:4, type: "S", status: "PE"}
	const Order3 = {price: 100, amount:5, type: "B", status: "PE"}
	
	trader.showOrderBooks()

	// 미체결 매수 주문
	const beforeOrder1 = trader.getOrderBooks().B.length
	trader.doTrade(Order1)
	const AfterOrder1 = trader.getOrderBooks().B.length

	t.is(beforeOrder1, AfterOrder1 - 1);

	
	// 미체결 매도 주문
	const beforeOrder2 = trader.getOrderBooks().S.length
	trader.doTrade(Order2)
	const AfterOrder2 = trader.getOrderBooks().S.length

	t.is(beforeOrder2, AfterOrder2 - 1);

	// trader.tradeOrder(Order2)
	// t.is(trader.getOrderBooks().S.length, 4);
	// trader.showOrderBooks()

	// trader.addOrder(Order3)
	// t.is(trader.getOrderBooks().B.length, 5);
	// trader.showOrderBooks()



	trader.showOrderBooks()

});