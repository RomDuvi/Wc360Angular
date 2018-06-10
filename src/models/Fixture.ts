import { Team } from "./Team";

export class Fixture
{
    id:number;
	team1Id:number;
    team2Id:number;
    scoreTeam1 : number;
    scoreTeam2: number;
    team1 : Team;
    team2 : Team;
    roundId : number;
	date:Date;
	ended: boolean;


	constructor($id: number, $team1Id: number, $team2Id: number, $scoreTeam1: number, $scoreTeam2: number, $team1: Team, $team2: Team, $roundId: number, $date: Date, $ended: boolean) {
		this.id = $id;
		this.team1Id = $team1Id;
		this.team2Id = $team2Id;
		this.scoreTeam1 = $scoreTeam1;
		this.scoreTeam2 = $scoreTeam2;
		this.team1 = $team1;
		this.team2 = $team2;
		this.roundId = $roundId;
		this.date = $date;
		this.ended = $ended;
	}
    
}