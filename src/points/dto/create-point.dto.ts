export class CreatePointDto {
    readonly leagueId: String;
    readonly queueType: String;
    readonly tier: String;
    readonly rank: String;
    readonly summonerId: String;
    readonly summonerName: String;
    readonly leaguePoints: Number;
    readonly wins: Number;
    readonly losses: Number;
    readonly veteran: Boolean;
    readonly inactive: Boolean;
    readonly freshBlood: Boolean;
    readonly hotStreak: Boolean;
    readonly time: Number;
}