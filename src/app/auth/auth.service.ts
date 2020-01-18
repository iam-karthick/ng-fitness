import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
    constructor(private router:Router,private afAuth:AngularFireAuth){}
    authChange = new Subject<boolean>();
    // private user:User;
    private isAuthenticated = false;

    registerUser(authData :AuthData){
       this.afAuth.auth.createUserWithEmailAndPassword(
           authData.email,
           authData.password
           ).then(result =>{
               console.log(result);
           }).catch(error=>{
               console.log(error);
           });
           this.authSuccessfully();
    }

    logIn(authData:AuthData){
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result =>{
                console.log(result);
                this.isAuthenticated = true;
                this.authSuccessfully();
            }).catch(error=>{
                console.log(error);
                alert(error)
            });
        }
    logOut(){
        this.afAuth.auth.signOut();
        this.isAuthenticated =null;
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }
    getUser(){
        // return {...this.user};   
    }
    isAuth(){
        return this.isAuthenticated;
    }
    authSuccessfully(){
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }
}