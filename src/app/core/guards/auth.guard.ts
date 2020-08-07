// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const isAuthorized = localStorage.getItem('user');

        if (!isAuthorized) {
            this._router.navigate(['/', 'auth']);
        }

        return !!isAuthorized;
    }
}
