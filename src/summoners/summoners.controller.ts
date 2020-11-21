import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CreateSummonerDto } from './dto/create-summoner.dto';
import { SummonersService } from './summoners.service';
import { Summoner } from './interfaces/summoner.interface';

@Controller('summoners')
export class SummonersController {
    constructor(private readonly summonersService: SummonersService) { }

    @Post()
    async create(@Body() createSummonerDto: CreateSummonerDto) {
        console.log(createSummonerDto)
        // createSummonerDto = {
        //     "id": "PuzxQYhd76OEtLo55Y2TjmLilKnfxCdgg1JTU2YaNw57Jk4",
        //     "accountId": "U3QyfPOkmQAtRT3zrN4RnPDmgXvcnxwHGhV3QjM4mIttHOM",
        //     "puuid": "PaTPbAn4HcBupbRkvzgW0d_PneUpqQjCPKlnsPJIHjF9gO_il4ygSMtRXzP0vB23N53plCys8dbN5A",
        //     "name": "가나라마아바",
        //     "profileIconId": 20,
        //     "revisionDate": 1604977403000,
        //     "summonerLevel": 81
        // }
        this.summonersService.create(createSummonerDto);
    }

    @Get()
    async findAll(): Promise<Summoner[]> {
        return this.summonersService.findAll();
    }
    @Get('by-name/:name')
    async findbyName(@Param('name') name: string): Promise<Summoner> {
        return this.summonersService.findOne(name)
    }
}
