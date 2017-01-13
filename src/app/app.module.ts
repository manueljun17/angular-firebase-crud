import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FirebaseApiModule } from '../api/firebase-api-2.0/firebase-api-module';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { LoginPage } from '../pages/authentication/login/login.component';
import { RegistrationPage } from '../pages/authentication/registration/registration.component';

import { BaseNav } from '../components/base/base-nav/base-nav';
import  { Data } from '../providers/data';
const appRoutes: Routes = [
  { path: '', component: LoginPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegistrationPage },
  { path: 'profile', component: RegistrationPage },
  { path: 'home', component: HomePage },
  { path: 'help', component: HelpPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    LoginPage,
    RegistrationPage,
    BaseNav
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRoutes ),
    FirebaseApiModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ Data ]
})
export class AppModule {}


