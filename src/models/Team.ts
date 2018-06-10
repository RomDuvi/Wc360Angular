export class Team
{
    name:string;
    id:number;
    currentRoundId:number;
    eleminated:boolean;
    ranking:number;


	constructor(name:string,id:number,currentRoundId:number,eleminated:boolean,ranking:number) {
        this.name = name;
        this.id = id;
        this.currentRoundId = currentRoundId;
        this.eleminated = eleminated;
        this.ranking = ranking;
    }
    
}