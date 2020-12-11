import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { IOrder } from 'src/orders/interfaces/order.interface';
import  trader from "./trader"
import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 10000
});


	test('should be defined', async (done) => {

		const BOrder1 = { price: 100, amount: 10, type: "B", status: "GO" }
		const BOrder2 = { price: 110, amount: 10, type: "B", status: "GO" }
		const BOrder3 = { price: 120, amount: 10, type: "B", status: "GO" }
		const BOrder4 = { price: 130, amount: 10, type: "B", status: "GO" }

		const SOrder1 = { price: 200, amount: 10, type: "S", status: "GO" }
		const SOrder2 = { price: 210, amount: 10, type: "S", status: "GO" }
		const SOrder3 = { price: 220, amount: 10, type: "S", status: "GO" }
		const SOrder4 = { price: 230, amount: 10, type: "S", status: "GO" }

		const BOrder5 = { price: 200, amount: 7, type: "B", status: "GO" }

		let ob, res;
		res = await instance.delete('/orders/all');

		res = await instance.post('/orders', BOrder1);
		res = await instance.post('/orders', BOrder2);
		res = await instance.post('/orders', BOrder3);
		res = await instance.post('/orders', BOrder4);
		res = await instance.post('/orders', SOrder1);
		res = await instance.post('/orders', SOrder2);
		res = await instance.post('/orders', SOrder3);
		res = await instance.post('/orders', SOrder4);
		ob = await instance.get('/processor/getorderbook');
		res = await instance.post('/orders', BOrder5);
		ob = await instance.get('/processor/getorderbook');
		res = await instance.post('/orders', BOrder5);
		ob = await instance.get('/processor/getorderbook');

		// ob = await instance.get('/processor/orderbook');

		// trader.showOrderBooks()
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

		expect(1).toBe(1);
	}, 10000);


	