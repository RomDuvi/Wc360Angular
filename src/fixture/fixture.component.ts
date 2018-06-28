import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Bet } from '../models/Bet';
import { AuthService } from '../authservice/auth.service';
import { Router } from '@angular/router';
import { Fixture } from '../models/Fixture';
import * as $ from 'jquery';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fixture',
    templateUrl: './fixture.component.html'
})
export class FixtureComponent {
    @Input() fixture: Fixture;
    existingBet: any;
    betClosed = false;
    bgClass = 'bg-white';

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        const h = this.fixture.date.getHours() - 1;
        const betDate = new Date(this.fixture.date);
        betDate.setHours(h);

        this.auth.connectedUser().then(x => {
            this.http.get('http://localhost:2323/api/bet/fixture/' + this.fixture.id + '/player/' + x.userName).toPromise().then(
            data => {
                this.existingBet = data;
                this.betClosed = betDate < new Date() || this.existingBet !== null;
                if (data !== null) {
                    this.setBackgroundColor(this.existingBet);
                }
            }
        );
        });
    }

    timeToString(date: Date): string {
        return date.getHours() + ':' + date.getMinutes() + '0' ;
    }

    saveBet() {
        this.auth.connectedUser().then(data => {
            this.http.post('http://localhost:2323/api/bet',
            new Bet(-1, this.fixture.id, false,
                            data.id, this.fixture.scoreTeam1, this.fixture.scoreTeam2, null,
                             new Date(), false, null, null),
                            {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                            .toPromise()
                            .then(x => {
                                this.fixture.scoreTeam1 = null;
                                this.fixture.scoreTeam2 = null;
                                this.ngOnChanges();
                            });
        });
    }

    setBackgroundColor(bet: Bet) {
        if (this.fixture.scoreTeam1 === null) { return; }

        if (this.fixture.scoreTeam1 === bet.scoreTeam1 && this.fixture.scoreTeam2 === bet.scoreTeam2) {
            this.bgClass = 'border border-success rounded'; // 'bg-success text-white';
            return;
        }

        // tslint:disable-next-line:max-line-length
        if ((this.fixture.scoreTeam1 > this.fixture.scoreTeam2 && bet.scoreTeam1 > bet.scoreTeam2) || (this.fixture.scoreTeam1 < this.fixture.scoreTeam2 && bet.scoreTeam1 < bet.scoreTeam2) || (this.fixture.scoreTeam1 === this.fixture.scoreTeam2 && bet.scoreTeam1 === bet.scoreTeam2)) {
            this.bgClass = 'border border-info rounded'; // 'bg-info text-white';
            return;
        }

        this.bgClass = 'border border-danger rounded'; // 'bg-danger text-white';
    }

    scoreValid(score: number): boolean {
        return score !== null && score >= 0;
    }
}
