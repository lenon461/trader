import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { IOrder } from 'src/orders/interfaces/order.interface';
import  trader from "./trader"
import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 10000
});


	test('should be defined', async (done) => {

		const Order1 = { price: 150, amount: 3, type: "S", status: "GO" }
		const Order2 = { price: 100, amount: 4, type: "B", status: "GO" }
		// const Order3 = { price: 100, amount: 10, type: "B", status: "GO" }
		// const Order4 = { price: 100, amount: 10, type: "B", status: "GO" }
		// const Order5 = { price: 100, amount: 2, type: "S", status: "GO" }
		// const Order6 = { price: 100, amount: 10, type: "S", status: "GO" }

		let ob, res;
		res = await instance.delete('/orders/all');
		console.log(res.data)

		// 미체결 매수 주문 (새 가격 - 추가되어야함)
		res = await instance.post('/orders', Order1);
		console.log(res.data)
		ob = await instance.get('/processor/orderbook');
		console.log(ob.data);

		// 미체결 매도 주문 (새 가격 - 추가되어야함)
		res = await instance.post('/orders', Order2);
		console.log(res.data)
		
		
		// trader.showOrderBooks()
		ob = await instance.get('/processor/orderbook');
		console.log(ob.data);

		// 미체결 매도 주문 (같은가격 - 병합되어야함)
		res = await instance.post('/orders', Order2);
		console.log(res.data)



		// trader.showOrderBooks()
		ob = await instance.get('/processor/orderbook');
		console.log(ob.data);
		// await instance.get('/orders/all');

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


	