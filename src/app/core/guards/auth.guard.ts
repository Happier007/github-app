// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('user')) {
            return true;
        } else {
            localStorage.removeItem('user');
            this._router.navigate(['/', 'auth']);
        }
    }
}
