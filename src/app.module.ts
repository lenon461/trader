import { Module } from '@nestjs/common';
import { ChartModule } from './chart/chart.module';
import { EventsModule } from './events/events.module';
import { SummonersModule } from './summoners/summoners.module';
import { PointsModule } from './points/points.module';

@Module({
  imports: [ChartModule, EventsModule, SummonersModule, PointsModule],
})

export class AppModule { }
