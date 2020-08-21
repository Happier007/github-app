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

  public saveAuthenticatedUser(user: UserModel, accessToken: string): void {
    localStorage.setItem('access-token', accessToken);
    this._authorizedUser$.next(user);
  }

  public removeAuthenticatedUser(): void {
    localStorage.removeItem('access-token');
    this._authorizedUser$.next(null);
  }
}
