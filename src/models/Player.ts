export class Player {
    id: number;
    userName: string;
    displayName: string;
    password: string;
    score: number;

    constructor(id: number, userName: string, displayName: string, password: string, score: number) {
        this.id = id;
        this.userName = userName;
        this.displayName = displayName;
        this.password = password;
        this.score = score;
    }
}
