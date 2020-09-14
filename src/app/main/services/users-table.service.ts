// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import {
  PageParamsSinceModel,
  PaginationModel,
  UserPublicModel
} from '@core/models';
import { UsersApiService } from '@core/services';
import { getPaginationParams } from '@core/helpers';


@Injectable()
export class UsersTableService implements OnDestroy {

  public usersSearchEvent = new EventEmitter<void>();
  public pagination: PaginationModel = new PaginationModel();

  private _pageParams: PageParamsSinceModel = new PageParamsSinceModel(this._route.snapshot.queryParams);
  private _users: UserPublicModel[] = [];
  private _usersSearchSubject = new Subject<void>();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersApiService: UsersApiService) {
    this._fetchUsers();
  }

  public get users(): UserPublicModel[] {
    return this._users;
  }

  public get getPage(): PageParamsSinceModel {
    return this._pageParams;
  }

  public getUsers(): void {
    this._usersSearchSubject.next();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEvent(since: number): void {
    this.pagination.nextPaginationId = this._pageParams.since = since;

    this.getUsers();
  }

  private _fetchUsers(): void {

    this._usersSearchSubject
    .pipe(
      switchMap(() => this._usersApiService.usersList(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {
      this._users = res.body.map((user: any) => user && new UserPublicModel(user));

      getPaginationParams(res.headers, this.pagination, this._pageParams.since);

      this._updateRouteParam();

      this.usersSearchEvent.emit();

    });
  }

  private _updateRouteParam(): void {
    const newPage: PageParamsSinceModel = {since: this.pagination.nextPaginationId};

    this._pageParams = new PageParamsSinceModel(newPage);

    this._router.navigate([], {
      queryParams: {
        since: this.pagination.prevPaginationId
      }
    });
  }
}
