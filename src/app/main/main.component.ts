// ANGULAR
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

// SHARED
import { LoaderService } from '@shared/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public isLoading: boolean;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _cdRef: ChangeDetectorRef,
    private _loaderService: LoaderService,
    private _userAuthApiService: UserAuthApiService,
    private _userService: UserService) {
  }

  public ngOnInit(): void {
    this._loadProgress();

    this._loadUser();

    this._authenticateUser();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
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

  private _loadUser(): void {
    this._userService.authorizedUser
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((user: UserModel) => {
      this.user = user;
      this._cdRef.detectChanges();
    });
  }

  private _loadProgress(): void {
    this._loaderService.isLoading
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((loadStatus: boolean) => {
      this.isLoading = loadStatus;
      this._cdRef.detectChanges();
    });
  }
}
