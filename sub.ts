import * as Queue from "bull"
const queue = new Queue('trade', 'redis://127.0.0.1:6379');

queue.process('trade', (job, done) => {
    console.log(job.data)
    done();
});

(async () => {
    console.log(await queue.count())

})()