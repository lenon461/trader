import * as mongoose from 'mongoose';

export const SummonerSchema = new mongoose.Schema({
    id: String,
    accountId: String,
    puuid: String,
    name: String,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number,
});