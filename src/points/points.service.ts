import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePointDto } from './dto/create-point.dto';
import { Point } from './interfaces/point.interface';
import { Line } from './interfaces/line.interface';
import _ from "lodash"
import * as moment from "moment"

@Injectable()
export class PointsService {
    constructor(@Inject('SUMMONER_MODEL') private readonly pointModel: Model<Point>) { }

    async create(createPointDto: CreatePointDto): Promise<Point> {
        const createdPoint = new this.pointModel(createPointDto);
        return createdPoint.save();
    }

    async findAllbyName(summonerName: string): Promise<Point[]> {
        const points = this.pointModel.find({ summonerName }).sort('time').exec();
        return points
    }

    PointtoLine(point: Point): Line {
        const line: Line = { time: moment(Number(point.time)).format('YYYY-MM-DD'), value: point.leaguePoints }
        console.log(line)
        return line
    }

}