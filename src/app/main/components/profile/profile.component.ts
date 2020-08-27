// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { GistsApiService, UserService } from '@core/services';
import { GistModel, PageParamsModel, UserModel } from '@core/models';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public gists$: Observable<GistModel[]>;
  public projects$: Observable<any>;
  public pageParamsGists: PageParamsModel = new PageParamsModel();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _gistsApiService: GistsApiService) {
  }

  public ngOnInit(): void {
    this._loadUser();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventGists($event: PageEvent): void {

  }

  private _loadUser(): void {
    this._userService.authorizedUser
    .pipe(
      takeUntil(this._destroyed$)
    ).subscribe((user: UserModel) => {
      if (user) {
        this.user = user;
        this.gists$ = this._gistsApiService.getUserGists(user.login, new PageParamsModel());
        this.projects$ = this._(user.login, new PageParamsModel());
      }
    });
  }
}
