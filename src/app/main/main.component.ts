// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import {
  UserAuthApiService,
  UserService
} from '@core/services';

import { UserModel } from '@core/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _userAuthApiService: UserAuthApiService,
    private _userService: UserService) {
  }

  public ngOnInit(): void {
    this._authenticateUser();
  }

  private _authenticateUser(): void {

    const accessToken = localStorage.getItem('access-token');

    if (accessToken) {

      this._userAuthApiService.fetchAuthenticatedUser(accessToken)
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe({
          next: (user: UserModel) => {
            this._userService.saveAuthenticatedUser(user);
          },
          error: () => {
            this._userService.removeAuthenticatedUser();
          },
          complete: () => {
          }
        }
      );
    }
  }
}
