import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { pointsProviders } from './points.provider';
import { PointsService } from './points.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PointsController],
  providers: [PointsService, ...pointsProviders]
})
export class PointsModule { }
