import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '@core/models';

@Injectable()
export class UserService {

  public authorizedUser$ = new Subject<any>();

  public saveAuthenticatedUser(user: UserModel): void {
    this.authorizedUser$.next(user);
  }

  public removeAuthenticatedUser(): void {
    this.authorizedUser$.next(null);
  }
}
