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
}

type ChartQuery = {
  time?: string,
  symbol?: string,
  interval?: string
}
