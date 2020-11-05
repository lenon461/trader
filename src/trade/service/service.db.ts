import { Redis } from "../db/redis"

export const getOrderCallData = async () => {

    try {
        let result;
        await Redis.HGETALL("BOB", (err, reply) => {
            console.log("reply")
            console.log(reply)
            result = reply
        })
        console.log("result")
        console.log(result)
        return result;

    } catch (error) {
        throw (error)
    }

}