// ANGULAR
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// CORE
import { UserAuthApiService, UserService } from '@core/services';

import { UserModel } from '@core/models';
// CURRENT
import { LoaderService } from './services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  public user$: Subject<UserModel> = this._userService.authorizedUser;
  public isLoading: boolean;

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _loaderService: LoaderService,
    private _userAuthApiService: UserAuthApiService,
    private _userService: UserService) {
  }

  public ngOnInit(): void {
    this._loadProgress();

    this._authenticateUser();
  }

  public logout(): void {
    localStorage.removeItem('access-token');

    this._userService.removeAuthenticatedUser();

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
