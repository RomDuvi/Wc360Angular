import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bet } from '../models/Bet';
import { AuthService } from '../authservice/auth.service';
import { Router } from '@angular/router';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fixture',
    templateUrl: './fixture.component.html'
})
export class FixtureComponent {
    @Input() fixture: any;
    existingBet: any;
    betClosed = false;

    constructor(private http: HttpClient, private auth: AuthService, private router:Router) {

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        const h = this.fixture.date.getHours() - 3;
        const betDate = new Date(this.fixture.date);
        betDate.setHours(h);

        this.auth.connectedUser().then(x => {
            this.http.get('http://localhost:2323/api/bet/fixture/' + this.fixture.id + '/player/' + x.userName).toPromise().then(
            data => {
                this.existingBet = data;
                this.fixture.date.setHours(h);
                this.betClosed = betDate < new Date() || this.existingBet !== null;
            }
        );
        });
    }

    timeToString(date: Date): string {
        return date.getHours() + ':' + date.getMinutes() + '0' ;
    }

    saveBet() {
        this.auth.connectedUser().then(data => {
            this.http.post('http://localhost:2323/api/bet/',
            new Bet(null, this.fixture.id, false,
                            data.id, this.fixture.scoreTeam1, this.fixture.scoreTeam2, null,
                             new Date(), false, null, null),
                            {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                            .toPromise()
                            .then(x => {
                                this.router.navigateByUrl('/competition');
                            });
        });
    }
}
