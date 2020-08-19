// ANGULAR
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { UserModel, TokenModel } from '@core/models';
import { IClient } from '@core/interfaces';

import {
  UserAuthApiService,
  UserService
} from '@core/services';

// SHARED
import { LoaderService } from '@shared/services';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  public username = new FormControl('', Validators.required);
  public isLoading: boolean;

  private _clientParams: IClient = {
    clientId: environment.clientId,
    redirectUri: environment.redirectUri,
  };

  private _destroyed$ = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _loaderService: LoaderService,
    private _userAuthApiService: UserAuthApiService,
    private _userService: UserService) {}

  public ngOnInit(): void {
    this._authenticateUser();

    this._loadProgress();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public login(): void {
    if (this.username.valid) {
      this._clientParams.login = this.username.value;

      this._userAuthApiService.authentication(this._clientParams);
    }
  }

  private _authenticateUser(): void {

    const code = this._route.snapshot.queryParamMap.get('code');

    if (code) {
      this._clientParams.clientSecret = environment.clientSecret;
      this._clientParams.code = code;

      let accessToken = '';

      this._userAuthApiService.getToken(this._clientParams)
      .pipe(
        tap((token: TokenModel) => accessToken = token.accessToken),
        switchMap((token: TokenModel) => this._userAuthApiService.fetchAuthenticatedUser(token.accessToken)),
        takeUntil(this._destroyed$)
      )
      .subscribe({
          next: (user: UserModel) => {
            localStorage.setItem('access-token', accessToken);
            this._userService.saveAuthenticatedUser(user);

            this._router.navigate(['/']);
          },
          error: () => {},
          complete: () => {
          }
        }
      );
    }
  }

  private _loadProgress(): void {
    this._loaderService.isLoading
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((loadStatus: boolean) => {
      this.isLoading = loadStatus;
      this._cd.detectChanges();
    });
  }
}
