import test from 'ava';
import logger from "../util/logger"

import * as redis from "./redis"


test('REDIS INIT', async t => {

    console.log("REDIS INIT")
    await redis.Initialize()
    console.log(typeof redis.Redis)

    t.is(1, 1)
});


