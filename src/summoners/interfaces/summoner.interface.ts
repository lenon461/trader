import { Document } from 'mongoose';

export interface Summoner extends Document {
    readonly id: String;
    readonly accountId: String;
    readonly puuid: String;
    readonly name: String;
    readonly profileIconId: Number;
    readonly revisionDate: Number;
    readonly summonerLevel: Number;
}