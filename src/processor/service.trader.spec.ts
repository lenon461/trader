import test from 'ava';
import  trader from "./trader"


describe('trader', () => {
	const Order1 = { price: 50, amount: 3, type: "B", status: "GO" }
	const Order2 = { price: 100, amount: 4, type: "S", status: "GO" }
	const Order3 = { price: 100, amount: 10, type: "B", status: "GO" }
	const Order4 = { price: 100, amount: 10, type: "B", status: "GO" }
	const Order5 = { price: 100, amount: 2, type: "S", status: "GO" }
	const Order6 = { price: 100, amount: 10, type: "S", status: "GO" }

	trader.showOrderBooks()

	// 미체결 매수 주문 (새 가격 - 추가되어야함)
	trader.addOrder(Order1)
	trader.showOrderBooks()

	// 미체결 매도 주문 (같은가격 - 병합되어야함)
	trader.addOrder(Order2)
	trader.showOrderBooks()
	// trader.addOrder(Order2)
	// trader.showOrderBooks()

	// // 체결 매수 주문 (매도자 일부 체결)
	// trader.addOrder(Order3)
	// trader.showOrderBooks()

	// // 체결 매수 주문 (매수자 일부 체결)
	// trader.addOrder(Order4)
	// trader.showOrderBooks()

	// // 체결 매도 주문 (매수자 일부 체결)
	// trader.addOrder(Order5)
	// trader.showOrderBooks()

	// // 체결 매도 주문 (매수자 일부 체결)
	// trader.addOrder(Order6)
	// trader.showOrderBooks()

	it('should be defined', () => {
		expect(1).toBe(1);
	});

});

