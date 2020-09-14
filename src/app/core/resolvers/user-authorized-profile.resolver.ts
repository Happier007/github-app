// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

// CORE
import { UserService } from '@core/services';
import { UserModel } from '@core/models';


@Injectable()
export class UserAuthorizedProfileResolver implements Resolve<UserModel> {

  constructor(private _userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | UserModel {
    return this._userService.authorizedUser
    .pipe(
      first()
    );
  }
}
