import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../api/firebase-api-2.0/user'
interface form{
    email:string,
    password:string
}
@Component( {
    selector: 'login-page',
    templateUrl: 'login.component.html'
})
export class LoginPage {
    loginForm: form = <form>{}
    constructor( public userService: User,
        private router: Router,
        private ngZone: NgZone ){
    }
    onClickLogin() {
        if( !this.validate() ) return;
         this.userService.login( this.loginForm.email, this.loginForm.password, response =>{
            console.log( 'response ' + JSON.stringify(response) )
            this.router.navigate(['/home']);
        }, error =>this.renderStatus( ) );
    }
    onClickReset() {
        this.loginForm = <form>{};
    }
    renderStatus( ){
        this.ngZone.run(() =>{
        })
    }
    validate(){
        if( this.loginForm.email == null || this.loginForm.email == ''){
            console.log('Please enter your registered email');
            return false;
        }
        if( this.loginForm.password == null || this.loginForm.password == '' ){
            console.log("No password");
            return false;
        }
        return true;
    }
}