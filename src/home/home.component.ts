import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Round } from '../models/Round';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: './home.component.html',
    styles: ['./home.component.css']
})
export class HomeComponent {
    private rounds: Round[] = [];

    constructor(private http: HttpClient) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.http.get('http://localhost:2323/api/round').subscribe((data: Round[]) => this.rounds = data);
    }
}
