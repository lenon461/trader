import test from 'ava';
import logger from "../util/logger"

import { Trader } from "./service.trader"

const trader = new Trader('NR')

logger('red', "========================")

test('GetOB', t => {
	t.truthy(Array.isArray(trader.getBuyOrders()));
	t.truthy(Array.isArray(trader.getSellOrders()));
});

test.skip('Do Trade by SelectedPrice', t => {
	
	const Order1 = {price: 50, amount:3, type: "B", status: "GO"}
	const Order2 = {price: 100, amount:4, type: "S", status: "GO"}
	const Order3 = {price: 100, amount:10, type: "B", status: "GO"}
	const Order4 = {price: 100, amount:10, type: "B", status: "GO"}
	const Order5 = {price: 100, amount:2, type: "S", status: "GO"}
	const Order6 = {price: 100, amount:10, type: "S", status: "GO"}
	
	trader.showOrderBooks()

	// 미체결 매수 주문 (새 가격 - 추가되어야함)
	trader.doTrade(Order1)
	trader.showOrderBooks()
	
	// 미체결 매도 주문 (같은가격 - 병합되어야함)
	trader.doTrade(Order2)
	trader.showOrderBooks()

	// 체결 매수 주문 (매도자 일부 체결)
	trader.doTrade(Order3)
	trader.showOrderBooks()

	// 체결 매수 주문 (매수자 일부 체결)
	trader.doTrade(Order4)
	trader.showOrderBooks()
	
	// 체결 매도 주문 (매수자 일부 체결)
	trader.doTrade(Order5)
	trader.showOrderBooks()

	// 체결 매도 주문 (매수자 일부 체결)
	trader.doTrade(Order6)
	trader.showOrderBooks()

	t.is(5, 5);
});

test('Do Trade by Beyond', t => {
	
	const Order1 = {price: 120, amount:1, type: "B", status: "GO"}

	// 체결 매수 주문 (최저매도가 이상 가격 - 최저 매도가랑 매칭 되어야함 )
	trader.doTrade(Order1)
	trader.showOrderBooks()

	
	const Order2 = {price: 130, amount:1, type: "B", status: "GO"}

	// 체결 매수 주문 (최저매도가 이상 가격 - 최저 매도가랑 매칭 되어야함 )
	trader.doTrade(Order2)
	trader.showOrderBooks()

	
	const Order3 = {price: 120, amount:20, type: "B", status: "GO"}

	// 체결 매수 주문 (일부 싹쓸이 주문)
	trader.doTrade(Order3)
	trader.showOrderBooks()

	const Order4 = {price: 20, amount:1, type: "S", status: "GO"}

	// 체결 매수 주문 (최저매도가 이상 가격 - 최저 매도가랑 매칭 되어야함 )
	trader.doTrade(Order4)
	trader.showOrderBooks()

	
	const Order5 = {price: 30, amount:1, type: "S", status: "GO"}

	// 체결 매수 주문 (최저매도가 이상 가격 - 최저 매도가랑 매칭 되어야함 )
	trader.doTrade(Order5)
	trader.showOrderBooks()

	
	const Order6 = {price: 20, amount:20, type: "S", status: "GO"}

	// 체결 매수 주문 (일부 싹쓸이 주문)
	trader.doTrade(Order6)
	trader.showOrderBooks()
	t.is(5, 5);


});
