// ANGULAR
import { Injectable } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';

// CORE
import { UserModel } from '@core/models';

@Injectable()
export class UserService {

  private _authorizedUser$ = new Subject<UserModel>();

  public get authorizedUser(): Subject<UserModel> {
    return this._authorizedUser$;
  }

  public saveAuthenticatedUser(user: UserModel): void {
    this._authorizedUser$.next(user);
  }

  public removeAuthenticatedUser(): void {
    this._authorizedUser$.next(null);
  }
}
