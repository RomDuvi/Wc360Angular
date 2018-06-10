import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authservice/auth.service';
import { Router } from '@angular/router';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ AuthService ]
})

export class LoginComponent {
    model: LoginModel = new LoginModel();

    constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
        if (auth.isAuthenticated()) {
            router.navigateByUrl('/home');
        }
    }

    login() {
        this.http.post('http://localhost:2323/api/token/', this.model, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                .subscribe(
                    data => this.loginSuccess(data),
                    error => console.log('unauthorized!'));
    }

    loginSuccess(token: any) {
        localStorage.setItem('token', token.token);
        localStorage.setItem('user', this.model.userName);
        this.router.navigateByUrl('/home');
    }
}

class LoginModel {
    userName: string;
    password: string;
}
