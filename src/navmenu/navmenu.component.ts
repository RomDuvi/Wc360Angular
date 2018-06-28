import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    constructor(private router: Router) {

    }

    logout() {
        localStorage.clear();
        location.reload();
    }
}
