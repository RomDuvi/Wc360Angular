import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../../models/Team';
import { AuthService } from '../../authservice/auth.service';
import { FormGroup } from '@angular/forms';
import { Bet } from '../../models/Bet';
import { Router } from '@angular/router';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'qualif-team',
    templateUrl: './qualifteam.component.html',
    styleUrls: ['./qualifteam.component.css']
})
export class QualifTeamComponent {
    qualifTeams: QualifTeam[] = [];
    bet = false;
    selectedNumber = 16;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.auth.connectedUser().then(data => {
            this.http.get<Team[]>('http://localhost:2323/api/team')
                .toPromise()
                .then(x => {
                    x.forEach(team => {
                        const t = new QualifTeam(false, team);
                        this.qualifTeams.push(t);
                    });
                    this.http.get<number[]>('http://localhost:2323/api/bet/qualifteam/player/' + data.id)
                            .toPromise()
                            .then(y => {
                                this.bet = y.length > 0;
                                this.selectedNumber = 0;
                                y.forEach(id => {
                                    this.qualifTeams.find(qt => qt.team.id === id).selected = true;
                                });
                            });
                });
        });
    }

    checkChange() {
        this.selectedNumber = 16;
        this.qualifTeams.forEach(team => {
            if (team.selected) {
                this.selectedNumber--;
            }
        });
    }

    saveBet() {
        this.auth.connectedUser().then(data => {
            this.http.post('http://localhost:2323/api/bet/qualifteam/' + data.id ,
            this.qualifTeams.filter(x => x.selected).map(x => ({playerId: data.id, teamId: x.team.id})),
            {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                    .subscribe(x => {
                        this.router.navigateByUrl('/bet');
                    });
        });
    }
}

class QualifTeam {
    selected: boolean;
    team: Team;

    constructor(selected: boolean, team: Team) {
        this.selected = selected;
        this.team = team;
    }
}
