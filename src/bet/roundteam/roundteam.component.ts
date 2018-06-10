import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../authservice/auth.service';
import { Router } from '@angular/router';
import { Round } from '../../models/Round';
import { Team } from '../../models/Team';
import { Bet } from '../../models/Bet';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'round-team',
    templateUrl: './roundteam.component.html',
    styleUrls: ['./roundteam.component.css']
})
export class RoundTeamComponent {
    rounds: any[] = [];
    teams: any[] = [];
    selectedTeam = null;
    selectedRound = null;
    bet: any;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.auth.connectedUser().then(data => {
            this.http.get<Team[]>('http://localhost:2323/api/team')
                     .toPromise().then(teams => {
                            this.teams = teams.map(x => {
                                                        return {id: x.id, name: x.name};
                                                    });
                            this.http.get<Round[]>('http://localhost:2323/api/round')
                                .toPromise().then(rounds => {
                                    this.rounds = rounds.filter(y => y.id !== 1).map(x => {
                                                                return {id: x.id, name: x.name};
                                                        });
                                    this.http.get<Bet>('http://localhost:2323/api/bet/roundTeam/player/' + data.userName)
                                            .subscribe(bet => {
                                                if (!bet) { return; }
                                                const roundName = rounds.find(r => r.id === bet.roundTeamRoundId).name;
                                                const teamName = teams.find(t => t.id === bet.roundTeamId).name;
                                                this.bet = {round: roundName, team: teamName};
                                                        });
                                                });
                                            });
                                    });
    }

    saveBet() {
        this.auth.connectedUser().then(data => {
            this.http.post('http://localhost:2323/api/bet/',
            new Bet(null, null, false,
                            data.id, null, null, null,
                             new Date(), false, this.selectedTeam, this.selectedRound),
                            {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                            .toPromise()
                            .then(x => {
                                this.router.navigateByUrl('/bet');
                            });
        });
    }
}
