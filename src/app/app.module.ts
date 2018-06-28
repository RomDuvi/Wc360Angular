import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FixtureComponent } from '../fixture/fixture.component';
import { RoundComponent } from '../round/round.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RankingComponent } from '../ranking/ranking.component';
import { BetComponent } from '../bet/bet.component';
import { TokenInterceptor } from '../authservice/token.interceptor';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../authservice/auth.service';
import { LoginActivate } from '../authservice/loginactivate.guard';
import { RoundTeamComponent } from '../bet/roundteam/roundteam.component';
import { WinnerTeamComponent } from '../bet/winnerteam/winnerteam.component';
import { QualifTeamComponent } from '../bet/qualifteam/qualifteam.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginActivate]},
  { path: 'login', component: LoginComponent},
  { path: 'bet', component: BetComponent, canActivate: [LoginActivate]},
  { path: 'ranking', component: RankingComponent},
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate]},
  { path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FixtureComponent,
    RoundComponent,
    NavMenuComponent,
    HomeComponent,
    BetComponent,
    RankingComponent,
    LoginComponent,
    RoundTeamComponent,
    WinnerTeamComponent,
    QualifTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthService,
      useClass: AuthService
    },
    {
      provide: LoginActivate,
      useClass: LoginActivate
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
