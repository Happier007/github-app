// ANGULAR
import { Injectable } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';

// CORE
import { UserModel } from '@core/models';

@Injectable()
export class UserService {

  private authorizedUser$ = new Subject<UserModel>();

  public get authorizedUser(): Subject<UserModel> {
    return this.authorizedUser$;
  }

  public saveAuthenticatedUser(user: UserModel): void {
    this.authorizedUser$.next(user);
  }

  public removeAuthenticatedUser(): void {
    this.authorizedUser$.next(null);
  }
}
