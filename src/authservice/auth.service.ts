import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Player } from 'src/models/Player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if (token === null) { return false; }

    const dToken = decode(token);

    return (dToken.exp * 1000) > new Date().getTime();
  }

  public connectedUser(): Promise<Player> {
    return this.http.get<Player>('http://localhost:2323/api/player/username/' + localStorage.getItem('user')).toPromise();
  }

}
