import { Controller, Get, Query } from '@nestjs/common';
import { ChartService } from './chart.service';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) { }

  @Get()
  getCandles(@Query() query: ChartQuery): string {
    const feed = this.chartService.getCandles(query);
    return JSON.stringify(feed)
  }

  @Get('lp')
  getLeaguePoint(@Query() query: any): string {
    const feed = [
      { time: "2020-10-01", value: 154 },
      { time: "2020-10-02", value: 153 },
      { time: "2020-10-03", value: 155 },
      { time: "2020-10-04", value: 157 },
      { time: "2020-10-05", value: 154 },
      { time: "2020-10-06", value: 154 },
      { time: "2020-10-07", value: 154 },
      { time: "2020-10-08", value: 154 },
      { time: "2020-10-09", value: 154 },
      { time: "2020-10-10", value: 154 },
      { time: "2020-10-11", value: 154 },
      { time: "2020-10-12", value: 154 },
      { time: "2020-10-13", value: 154 },
      { time: "2020-10-14", value: 154 },
      { time: "2020-10-15", value: 154 },
      { time: "2020-10-16", value: 154 },
      { time: "2020-10-17", value: 154 },
      { time: "2020-10-18", value: 154 },
      { time: "2020-10-19", value: 154 },
      { time: "2020-10-20", value: 154 },
      { time: "2020-10-21", value: 154 },
      { time: "2020-10-22", value: 154 },
      { time: "2020-10-23", value: 154 },
      { time: "2020-10-24", value: 154 },
      { time: "2020-10-25", value: 154 },
      { time: "2020-10-26", value: 154 },
      { time: "2020-10-27", value: 154 },
      { time: "2020-10-28", value: 154 },
      { time: "2020-10-29", value: 154 },
      { time: "2020-10-30", value: 154 },
      { time: "2020-10-31", value: 154 },
      { time: "2020-11-01", value: 154 },
      { time: "2020-11-02", value: 154 },
    ]
    return JSON.stringify(feed)
  }
}

type ChartQuery = {
  time?: string,
  symbol?: string,
  interval?: string
}
