import { Module } from '@nestjs/common';
import { ChartModule } from './chart/chart.module';
import { EventsModule } from './events/events.module';
import { SummonersModule } from './summoners/summoners.module';
import { PointsModule } from './points/points.module';
import { OrdersModule } from './orders/orders.module';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AudioModule, OrdersModule,
    ChartModule, EventsModule, SummonersModule, PointsModule],
})

export class AppModule { }
