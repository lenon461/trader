import { Mongoose } from 'mongoose';
import { PointSchema } from './schemas/point.schema'

export const pointsProviders = [
    {
        provide: 'SUMMONER_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Point', PointSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];