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
  getLP(@Query() query: any): string {
    const feed = this.chartService.getData({
      name: 'lp',
      type: 'line',
      ...query,
    })
    return JSON.stringify(feed)
  }
}

type ChartQuery = {
  symbol?: string,
  count?: number,
  to?: String
  interval?: string
}


