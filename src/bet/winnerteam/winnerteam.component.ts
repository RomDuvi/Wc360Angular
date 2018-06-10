import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../../models/Team';
import { AuthService } from '../../authservice/auth.service';
import { FormGroup } from '@angular/forms';
import { Bet } from '../../models/Bet';
import { Router } from '@angular/router';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'winner-team',
    templateUrl: './winnerteam.component.html',
    styleUrls: ['./winnerteam.component.css']
})
export class WinnerTeamComponent {
    winningTeam: Team;
    teams: any[] = [];
    selected = null;
    canBet: boolean;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.http.get<Team[]>('http://localhost:2323/api/team').toPromise()
                .then(x => {
                    this.teams = x.filter(xt => xt.eleminated === false).map(t => {
                        return {id: t.id, name: t.name};
                    });
                    this.auth.connectedUser().then(
                        a => {
                            this.http.get<Bet>('http://localhost:2323/api/bet/winnerTeam/player/' + a.userName)
                            .subscribe(w => {
                                this.winningTeam = x.find(elem => elem.id === w.winnerTeamId);
                                console.log(this.winningTeam.eleminated + '-' + this.isInBetDate());
                                this.canBet = this.winningTeam.eleminated && this.isInBetDate();
                                console.log(this.canBet);
                            });
                        });
                });
    }

    saveBet() {
        this.auth.connectedUser().then(data => {
            this.http.post('http://localhost:2323/api/bet/',
            new Bet(null, null, false,
                            data.id, null, null, this.selected,
                             new Date(), false, null, null),
                            {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                            .subscribe(x => {
                                this.router.navigateByUrl('/bet');
                            });
        });
    }

    isInBetDate(): boolean {
        const betDates = [new BetDate(new Date(2018, 5, 7, 23, 59, 59, 0), new Date(2018, 5, 14, 13, 0, 0, 0)),
                                    new BetDate(new Date(2018, 5, 29, 0, 0, 0, 0), new Date(2018, 5, 30, 15, 0, 0)),
                                    new BetDate(new Date(2018, 6, 4, 0, 0, 0, 0), new Date(2018, 6, 6, 0, 0, 0, 0))];

        const currentDate = new Date();
        for (let i = 0; i < betDates.length; i++) {
            const date =  betDates[i];
            if (currentDate > date.startDate && currentDate < date.endDate) {
                return true;
            }
        }
        return false;
    }
}

class BetDate {
    startDate: Date;
    endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
