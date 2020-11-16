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
    const feed = [{ "time": "2020-08-12", "value": 108 }, { "time": "2020-08-13", "value": 103 }, { "time": "2020-08-14", "value": 109 }, { "time": "2020-08-15", "value": 96 }, { "time": "2020-08-16", "value": 100 }, { "time": "2020-08-17", "value": 104 }, { "time": "2020-08-18", "value": 98 }, { "time": "2020-08-19", "value": 108 }, { "time": "2020-08-20", "value": 101 }, { "time": "2020-08-21", "value": 101 }, { "time": "2020-08-22", "value": 107 }, { "time": "2020-08-23", "value": 107 }, { "time": "2020-08-24", "value": 107 }, { "time": "2020-08-25", "value": 107 }, { "time": "2020-08-26", "value": 97 }, { "time": "2020-08-27", "value": 97 }, { "time": "2020-08-28", "value": 91 }, { "time": "2020-08-29", "value": 90 }, { "time": "2020-08-30", "value": 101 }, { "time": "2020-08-31", "value": 105 }, { "time": "2020-09-01", "value": 102 }, { "time": "2020-09-02", "value": 106 }, { "time": "2020-09-03", "value": 96 }, { "time": "2020-09-04", "value": 103 }, { "time": "2020-09-05", "value": 97 }, { "time": "2020-09-06", "value": 101 }, { "time": "2020-09-07", "value": 102 }, { "time": "2020-09-08", "value": 102 }, { "time": "2020-09-09", "value": 95 }, { "time": "2020-09-10", "value": 101 }, { "time": "2020-09-11", "value": 106 }, { "time": "2020-09-12", "value": 95 }, { "time": "2020-09-13", "value": 109 }, { "time": "2020-09-14", "value": 95 }, { "time": "2020-09-15", "value": 104 }, { "time": "2020-09-16", "value": 109 }, { "time": "2020-09-17", "value": 94 }, { "time": "2020-09-18", "value": 106 }, { "time": "2020-09-19", "value": 102 }, { "time": "2020-09-20", "value": 100 }, { "time": "2020-09-21", "value": 90 }, { "time": "2020-09-22", "value": 95 }, { "time": "2020-09-23", "value": 92 }, { "time": "2020-09-24", "value": 95 }, { "time": "2020-09-25", "value": 103 }, { "time": "2020-09-26", "value": 96 }, { "time": "2020-09-27", "value": 110 }, { "time": "2020-09-28", "value": 99 }, { "time": "2020-09-29", "value": 97 }, { "time": "2020-09-30", "value": 105 }, { "time": "2020-10-01", "value": 94 }, { "time": "2020-10-02", "value": 92 }, { "time": "2020-10-03", "value": 106 }, { "time": "2020-10-04", "value": 92 }, { "time": "2020-10-05", "value": 106 }, { "time": "2020-10-06", "value": 99 }, { "time": "2020-10-07", "value": 107 }, { "time": "2020-10-08", "value": 107 }, { "time": "2020-10-09", "value": 93 }, { "time": "2020-10-10", "value": 91 }, { "time": "2020-10-11", "value": 96 }, { "time": "2020-10-12", "value": 96 }, { "time": "2020-10-13", "value": 107 }, { "time": "2020-10-14", "value": 108 }, { "time": "2020-10-15", "value": 103 }, { "time": "2020-10-16", "value": 101 }, { "time": "2020-10-17", "value": 95 }, { "time": "2020-10-18", "value": 103 }, { "time": "2020-10-19", "value": 99 }, { "time": "2020-10-20", "value": 92 }, { "time": "2020-10-21", "value": 106 }, { "time": "2020-10-22", "value": 95 }, { "time": "2020-10-23", "value": 102 }, { "time": "2020-10-24", "value": 97 }, { "time": "2020-10-25", "value": 109 }, { "time": "2020-10-26", "value": 91 }, { "time": "2020-10-27", "value": 94 }, { "time": "2020-10-28", "value": 100 }, { "time": "2020-10-29", "value": 95 }, { "time": "2020-10-30", "value": 106 }, { "time": "2020-10-31", "value": 94 }, { "time": "2020-11-01", "value": 100 }, { "time": "2020-11-02", "value": 93 }, { "time": "2020-11-03", "value": 105 }, { "time": "2020-11-04", "value": 105 }, { "time": "2020-11-05", "value": 102 }, { "time": "2020-11-06", "value": 100 }, { "time": "2020-11-07", "value": 110 }, { "time": "2020-11-08", "value": 96 }, { "time": "2020-11-09", "value": 103 }, { "time": "2020-11-10", "value": 105 }, { "time": "2020-11-11", "value": 94 }, { "time": "2020-11-12", "value": 99 }, { "time": "2020-11-13", "value": 101 }, { "time": "2020-11-14", "value": 98 }, { "time": "2020-11-15", "value": 96 }]
    return JSON.stringify(feed)
  }
}

type ChartQuery = {
  time?: string,
  symbol?: string,
  interval?: string
}


