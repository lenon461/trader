import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { PointsService } from './points.service';
import { Point } from './interfaces/point.interface';
import { Line } from './interfaces/line.interface';
import * as moment from "moment"
import { subtract } from 'lodash';

@Controller('points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) { }

    @Post()
    async create(@Body() createPointDto: CreatePointDto) {
        makeFakerPointStub().map(createPointDto => this.pointsService.create(createPointDto))
    }

    @Get(':summonerName')
    async rawDatabyName(@Param('summonerName') summonerName: string): Promise<Point[]> {
        return this.pointsService.findAllbyName(summonerName)
    }

    @Get(':summonerName/chart')
    async chartDatabyName(@Param('summonerName') summonerName: string): Promise<Line[]> {
        const Points = this.pointsService.findAllbyName(summonerName)
        const results = (await Points).map(point => this.pointsService.PointtoLine(point))
        return results;
    }
}

function makeFakerPointStub() {
    console.log("CREATE")
    let createPointDtoTemp;
    const results = []
    const lps = [284, 247, 226, 154, 154, 154, 154, 136, 153, 188, 169]
    for (const index in new Array(11).fill(1)) {
        const time = (moment().subtract(index, 'days').valueOf())

        createPointDtoTemp = {
            "leagueId": "58d53e1d-0514-3760-a988-50bf33fb782f",
            "queueType": "RANKED_SOLO_5x5",
            "tier": "MASTER",
            "rank": "I",
            "summonerId": "D0QIxicbLmrkll0Xkgd8aHH2LZOWFJzKC5hUf57UMQLLaw",
            "summonerName": "Hide on bush",
            "leaguePoints": lps[index],
            "wins": 606,
            "losses": 599,
            "veteran": false,
            "inactive": false,
            "freshBlood": false,
            "hotStreak": true,
            "time": time,
        }
        results.push(createPointDtoTemp);
    }
    return results

}