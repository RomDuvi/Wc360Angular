import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})

export class RankingComponent {
    players: Player[];

    constructor(private http: HttpClient) {

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.http.get<Player[]>('http://localhost:2323/api/player').subscribe(x => this.players = x);
    }
}
