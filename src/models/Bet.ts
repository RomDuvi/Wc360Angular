export class Bet {
    id: number;
    fixtureId: number;
    isDraw: boolean;
    playerId: number;
    scoreTeam1: number;
    scoreTeam2: number;
    winnerTeamId: number;
    date: Date;
    checked: boolean;
    roundTeamId: number;
    roundTeamRoundId: number;


    // tslint:disable-next-line:max-line-length
    constructor($id: number, $fixtureId: number, $isDraw: boolean, $playerId: number, $scoreTeam1: number, $scoreTeam2: number, $winnerTeamId: number, $date: Date, $checked:boolean, $roundTeamId: number, $roundTeamRoundId: number) {
        this.id = $id;
        this.fixtureId = $fixtureId;
        this.isDraw = $isDraw;
        this.playerId = $playerId;
        this.scoreTeam1 = $scoreTeam1;
        this.scoreTeam2 = $scoreTeam2;
        this.winnerTeamId = $winnerTeamId;
        this.date = $date;
        this.roundTeamId = $roundTeamId;
        this.checked = $checked;
        this.roundTeamRoundId = $roundTeamRoundId;
    }

}