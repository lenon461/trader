import { Module } from '@nestjs/common';
import { ChartModule } from './api/chart/chart.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [ChartModule, EventsModule],
})

export class AppModule { }
