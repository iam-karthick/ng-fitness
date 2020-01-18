import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,private router:Router) { }
    canActivate(route: ActivatedRouteSnapshot, sate: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        }else{
            this.router.navigate(['/login'])
        }
    }
}