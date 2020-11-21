import { Mongoose } from 'mongoose';
import { SummonerSchema } from './schemas/summoner.schema'

export const summonersProviders = [
    {
        provide: 'SUMMONER_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Summoner', SummonerSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];