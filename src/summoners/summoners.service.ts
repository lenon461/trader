import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSummonerDto } from './dto/create-summoner.dto';
import { Summoner } from './interfaces/summoner.interface';

@Injectable()
export class SummonersService {
    constructor(@Inject('SUMMONER_MODEL') private readonly summonerModel: Model<Summoner>) { }

    async create(createSummonerDto: CreateSummonerDto): Promise<Summoner> {
        const createdSummoner = new this.summonerModel(createSummonerDto);
        return createdSummoner.save();
    }

    async findOne(name: string): Promise<Summoner> {
        return this.summonerModel.findOne({ name })
    }

    async findAll(): Promise<Summoner[]> {
        return this.summonerModel.find().exec();
    }
}