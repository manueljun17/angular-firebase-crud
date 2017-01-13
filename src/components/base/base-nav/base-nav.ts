import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { User } from '../../../api/firebase-api-2.0/user'
@Component( {
    selector: 'base-nav',
    templateUrl: './base-nav.html'
})
export class BaseNav {
    auth: boolean;
    constructor( public userService: User,
        private router: Router,
        private ngZone: NgZone ) {
        this.checkAuthentication();
    }
    ngOnInit() {
        
    }
    checkAuthentication() {
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                this.auth = true;
                this.renderElement();
                // this.router.navigate(['/home']);
                
            } else {
                this.auth = false;
                this.renderElement();
            }
        });
    }
    onClickLogin() {
        this.router.navigate(['/login']);
    }
    onClickRegister() {
        this.router.navigate(['/register']);
    }
    onClickLogout() {
        this.userService.logout( ( response ) => {
            this.auth = false;
            this.renderElement();
            this.router.navigate(['/login']);
        },( error )=>{
            console.log( 'error ' + JSON.stringify(error) );
        }); 
    }
    renderElement( ){
        this.ngZone.run(() =>{
        })
    }
}