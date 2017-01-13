import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../providers/data';
import { User } from '../../../api/firebase-api-2.0/user'
import * as firebase from 'firebase';
interface Form{
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    birthday: string,
    photo: string
}
let form: Form =  {
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    birthday: "",
    photo: ""
}
@Component( {
    selector: 'registration-page',
    templateUrl: 'registration.component.html'
})
export class RegistrationPage {
    urlPhoto: string = 'assets/img/default.png';
    password: string;
    registrationForm:Form = form;
    file_progress: boolean;
    position: number;
    userSession: any = null;
    userdata: any = null;
    constructor( public userService: User,
        private router: Router,
        private ngZone: NgZone,
        private data: Data ){
            this.checkAuthorization();
            
    }
    checkAuthorization(){
        console.log('checkAuthorization() ' );
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                this.userSession = user;
                this.getUserData();
            } else {
                console.log('not logged in')
            }
        });
    }
    getUserData(){
        if( this.userSession ){
            console.log('getUserData() ' );
            this.userService.get( this.userSession.uid , res =>{
                console.log('getUserData() ' + res['email'] );
                this.userdata = res;
                this.initializeData();
                this.renderPage();
            }, error => alert('Something went wrong ' + error ) )
        }
    }
    initializeData(){
        if( this.userdata ){
            console.info('userData '  + JSON.stringify(this.userSession))
            this.urlPhoto  = this.userdata.photo;
            this.registrationForm.firstname = this.userdata['firstname'];
            this.registrationForm.lastname = this.userdata['lastname'];
            this.registrationForm.birthday = this.userdata['birthday'];
            this.registrationForm.email = this.userdata['email'];
            this.registrationForm.gender = this.userdata['gender'];
            console.log("userdata:",this.userdata);
        }
    }
    onChangeFile( $event ){
        let file = $event.target.files[0];
        if( file == void 0) return;
        this.file_progress = true;

        let ref = 'photo/' + Date.now() + '/' + file.name;

        this.data.upload( { file: file, ref: ref }, uploaded=>{
            this.registrationForm.photo = uploaded.url;
            this.renderProfilePic( uploaded.url );
        }, error=>{
            alert('Error'+ error);
        },
        percent=>{
            this.position = percent;
            this.renderPage( );
        } );
    }
    onClickRegister() {
        this.register();
    }
    register(){
        if( this.validate() == false ) return;
        this.userService.data('key',this.registrationForm.email)
            .data('email',this.registrationForm.email)
            .data('password',this.password)
            .data('firstname',this.registrationForm.firstname)
            .data('lastname',this.registrationForm.lastname)
            .data('birthday',this.registrationForm.birthday)
            .data('gender',this.registrationForm.gender)
            .data('photo',this.registrationForm.photo)
            .create( (uid)=>{
                console.log("registration success");
            },(error)=>{
                console.log("registration failed:",error);
            },()=>{
        });
    }
    renderProfilePic( data ){
        this.ngZone.run(() =>{
            this.urlPhoto = data;
            this.file_progress = false;
        });
    }
    renderPage(  ) {
        this.ngZone.run(() => {
        });
    }
    validate(){
        if( this.registrationForm.email == '' || this.registrationForm.email == null){
            alert('enter your Email address');
            return false;
        }
        if( this.password == '' || this.password == null ){
            alert('password is required');
            return false;
        }
        if( this.registrationForm.firstname == '' || this.registrationForm.firstname == null ){
            alert('please provide your firstname');
            return false;
        }
        if( this.registrationForm.lastname == '' || this.registrationForm.lastname == null ){
            alert('please provide your Lastname');
            return false;
        }
        if( this.registrationForm.gender == '' || this.registrationForm.gender == null){
            alert('Please select your gender');
            return false;
        }
        return true;
    }
}