import { Module } from '@nestjs/common';
import { ChartModule } from './api/chart/chart.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ChartModule, EventsModule],
})

export class AppModule { }
