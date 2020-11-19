import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import * as _ from "lodash"
import Stub from "../stub"
@Injectable()
export class ChartService {
  
  getCandles(options): Array<object> {
    const default_options = {
      from: moment().subtract(30, 'days').valueOf(),
      to: moment().valueOf()
    }
    options.from = options.from ? (options.from) : default_options.from
    options.to = options.to ? (options.to) : default_options.to
    if (options.time) return this.updateStub((options.time))
    return this.makeInitStub(options);
  }
  //.format("YYYY-MM-DD");
  makeInitStub(options) {

    const from = moment(parseInt(options.from))
    const to = moment(parseInt(options.to))
    const feeds = [];
    let time = from;
    while (time <= to) {
      feeds.push(this.makeRandomFeed(time.format("YYYY-MM-DD")))
      time = time.add(1, 'days')
    }
    console.log(JSON.stringify(feeds.slice(0, 20)))
    return feeds
  }
  updateStub(timestamp) {
    const time = moment(timestamp)
    return [this.makeRandomFeed(time.format("YYYY-MM-DD"))]

  }
  makeRandomFeed(time, base?, ns?) {
    const basePrice = base || 60;
    const noiseStrength = ns || 0.1
    const noise = 0.1 - Math.random() * noiseStrength + 1.0;
    const delta = 0.7 * (1 + Math.random())
    const noisedPrice = basePrice * noise;
    const deltadPrice = noisedPrice * delta;
    return { time, open: noisedPrice, high: noisedPrice, low: deltadPrice, close: deltadPrice }
  }

  getData(params: ChartParams) {
    const {name, type, count = 200, to} = params
    const data = _.orderBy(Stub[name].data, ['time'], ['asc']);
    const returnData = [];
    if(!to) return data.slice(300, 500)
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(index == count) break;
      if(to && moment(to).valueOf() > moment(element.time).valueOf()) continue;
      returnData.push(element)  
    }
    return returnData
  }

  

}



type ChartParams = {
  name: string,
  type: string,
  symbol?: string,
  count?: number,
  to?: string,
  interval?: string
}
type ReturnChart = {
  data: object,

}