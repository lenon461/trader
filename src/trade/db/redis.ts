import redis from "redis"
import pool from "generic-pool"
import asyncRedis from "async-redis"

const RedisConfig = {
    host: "localhost",
    db: '0',
};

const RedisPoolOpt = {
    min: 0,
    max: 5,
    idleTimeoutMillis: 3000,
}

const RedisPool = pool.createPool<redis.RedisClient>({
    create: () => {
        return new Promise((resolve, reject) => {
            const client = redis.createClient(RedisConfig)
            client.on("connect", () => {
                console.log("connect ");
                resolve(client)
            });
            client.on("error", (err) => {
                console.log("Error " + err);
                reject(err)
            });
        })
    },
    destroy: (client: redis.RedisClient) => {
        return new Promise((resolve, reject) => {
            client.on("end", () => {
                console.log("end ");
                resolve()
            });
            client.quit();
        })
    }
}, RedisPoolOpt)

const ObjectMethod = {};

async function Initialize() {
    const client = await RedisPool.acquire();

    const methods = [];
    for (const iterator in client) {
        if (typeof client[iterator] === 'function') {
            methods.push(client[iterator])
        }
    }
    RedisPool.release(client)

    methods.forEach(async funcName => {
        ObjectMethod[funcName] = async (...args) => {
            const client = await RedisPool.acquire();
            return new Promise((resolve, reject) => {

                const callback = (err, res) => {
                    if (err) reject(err);
                    else resolve(res)
                }
                client[funcName].apply(client, [...args, callback])

            }).then(res => {
                RedisPool.release(client)
                return res
            }).catch(err => {
                RedisPool.release(client)
                throw err
            })
        }
    })

}

const Redis = <redis.RedisClient>ObjectMethod;
const client = redis.createClient(RedisConfig)
asyncRedis.decorate(client);

export { Redis, Initialize }
