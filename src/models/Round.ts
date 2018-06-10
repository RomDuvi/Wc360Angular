export class Round {
    name: string;
    id: number;
    order: number;
    startDate: Date;
    endDate: Date;

    constructor(name: string, id: number, order: number, startDate: Date, endDate: Date) {
        this.name = name;
        this.id = id;
        this.order = order;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
