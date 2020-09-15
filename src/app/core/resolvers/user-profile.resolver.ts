// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { UsersApiService } from '@core/services';
import { UserPublicModel } from '@core/models';


@Injectable()
export class UserProfileResolver implements Resolve<UserPublicModel> {

  constructor(private _usersApiService: UsersApiService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserPublicModel> | UserPublicModel {
    return this._usersApiService.getUser(route.params.username);
  }
}
