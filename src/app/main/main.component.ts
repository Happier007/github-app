// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { UserAuthApiService } from '@core/services';
import { UserModel } from '@core/models';

// CURRENT
import { LoaderService } from './services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user$: Subject<UserModel> = this._userAuthApiService.authorizedUser$;
  public isLoading$: Subject<boolean> = this._loaderService.isLoading;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _loaderService: LoaderService,
    private _userAuthApiService: UserAuthApiService) {
  }

  public ngOnInit(): void {
    this._authenticateUser();
  }

  public logout(): void {
    localStorage.removeItem('access-token');

    this._userAuthApiService.removeAuthenticatedUser();

    this._router.navigate(['/', 'auth']);
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
            this._userAuthApiService.saveAuthenticatedUser(user);
          },
          error: () => {
            this._userAuthApiService.removeAuthenticatedUser();
          },
          complete: () => {
          }
        }
      );
    }
  }
}
