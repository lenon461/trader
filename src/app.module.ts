import { Module } from '@nestjs/common';
import { ChartModule } from './api/chart/chart.module';

@Module({
  imports: [ChartModule],
})

export class AppModule { }
