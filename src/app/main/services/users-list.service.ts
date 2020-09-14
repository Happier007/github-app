// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import {
  PageParamsSinceModel,
  UserPublicModel
} from '@core/models';
import { SINCE_PAGINATION } from '@core/utils';
import { UsersApiService } from '@core/services';


@Injectable()
export class UsersListService implements OnDestroy {

  public usersSearchEvent = new EventEmitter<void>();
  public nextPaginationId = 0;

  private _users: UserPublicModel[] = [];

  private _pageParams: PageParamsSinceModel = new PageParamsSinceModel(this._route.snapshot.queryParams);
  private _usersSearchSubject = new Subject<void>();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersApiService: UsersApiService) {
    this._fetchUsers();
  }

  public users(): UserPublicModel[] {
    return this._users;
  }

  public getPage(): PageParamsSinceModel {
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
    this.nextPaginationId = this._pageParams.since = since;

    this.getUsers();
  }

  private _fetchUsers(): void {

    this._usersSearchSubject
    .pipe(
      switchMap(() => this._usersApiService.usersList(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {
      const nextPageLink = res.headers.get('link').match(SINCE_PAGINATION);

      const prevPaginationId = !!this.nextPaginationId ? this.nextPaginationId : this._pageParams.since;
      this.nextPaginationId = nextPageLink.length ? nextPageLink[1] : this.nextPaginationId;

      this._users = res.body.map((user: any) => user && new UserPublicModel(user));

      this._updateRouteParam(prevPaginationId, this.nextPaginationId);

      this.usersSearchEvent.emit();
    });
  }

  private _updateRouteParam(prev: number, next: number): void {
    const newPage: PageParamsSinceModel = {since: this.nextPaginationId};

    this._pageParams = new PageParamsSinceModel(newPage);

    this._router.navigate([], {
      queryParams: {
        since: prev
      }
    });
  }
}
