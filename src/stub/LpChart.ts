import * as moment from "moment";

const today = moment()
const init = []
function getRandomPrice() {
  return Math.round(100 + (Math.random() - 0.5) * 20)
}

for (let index = 0; index < 500; index++) {
  const day = today.subtract(1, 'days').format("YYYY-MM-DD")
  init.unshift({ time: day, value: getRandomPrice() })
}
init.reverse()
console.log(JSON.stringify(init))
export { init }