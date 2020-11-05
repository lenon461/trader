import test from 'ava';
import logger from "../util/logger"

import { getOrderCallData } from "./service.db"


logger('red', "========================")

test('GetOB', async t => {

	const result = await getOrderCallData();
	console.log(result)

	t.is(1, 1)
}, 10000);

