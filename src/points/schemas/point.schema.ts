import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
    leagueId: String,
    queueType: String,
    tier: String,
    rank: String,
    summonerId: String,
    summonerName: String,
    leaguePoints: Number,
    wins: Number,
    losses: Number,
    veteran: Boolean,
    inactive: Boolean,
    freshBlood: Boolean,
    hotStreak: Boolean,
    time: Number,
});