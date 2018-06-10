import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fixture } from '../models/Fixture';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.css']
})
export class RoundComponent {
    @Input() round: any;
    private fixtures: Fixture[] = [];
    private dates: Date[] = [];

    private fixtureDates: FixtureDate[] = [];

    constructor(private http: HttpClient) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        if (!this.round) { return; }
        this.http.get('http://localhost:2323/api/fixture/round/' + this.round.id).subscribe((data: Fixture[]) => this.initFixtures(data));
    }

    initFixtures(fixtures: Fixture[]) {
        fixtures.forEach(fixture => {
            const d = fixture.date;
            fixture.date = this.toDate(fixture.date);

            let fd = this.fixtureDates.find(fixtureDate => {
                return fixtureDate.date.getTime() === this.toDayDate(d).getTime();
            });

            if (fd == null) {
                fd = new FixtureDate(this.toDayDate(d));
                this.fixtureDates.push(fd);
            }

            fd.fixtures.push(fixture);
        });
    }

    getFixturesForDate(date: Date): Fixture[] {
        return this.fixtures.filter(fixture => fixture.date === date);
    }

    dateWithoutTime(date: Date): Date {
        return new Date(date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
    }

    toDate(date: any): Date {
        const dateParts = date.split('-');
        const timeParts = dateParts[2].split(':');

        return new Date(+dateParts[0], +dateParts[1] - 1, +(dateParts[2].substr(0, 2)) , timeParts[0].substr(3, 5), timeParts[1]);
    }

    toDayDate(date: any): Date {
        const dateParts = date.split('-');
        return new Date(+dateParts[0], +dateParts[1] - 1, +(dateParts[2].substr(0, 2)));
    }
}

class FixtureDate {
    date: Date;
    fixtures: Fixture[] = [];

    constructor(date: Date) {
        this.date = date;
    }
}


