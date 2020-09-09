// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import {
  RepoModel,
  PageParamsSinceModel
} from '@core/models';
import { ReposApiService } from '@core/services';
import { SINCE_PAGINATION } from '@core/utils';


@Injectable()
export class ReposTableService implements OnDestroy {

  public reposSearchEvent = new EventEmitter<void>();
  public nextPaginationId = 0;

  private _repos: RepoModel[] = [];

  private _pageParams: PageParamsSinceModel = new PageParamsSinceModel(this._route.snapshot.queryParams);
  private _reposSearchSubject = new Subject<void>();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reposApiService: ReposApiService) {
    this._fetchRepos();
  }

  public get repos(): RepoModel[] {
    return this._repos;
  }

  public get getPage(): PageParamsSinceModel {
    return this._pageParams;
  }

  public getRepos(): void {
    this._reposSearchSubject.next();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEvent(since: number): void {
    this.nextPaginationId = this._pageParams.since = since;

    this.getRepos();
  }

  private _fetchRepos(): void {

    this._reposSearchSubject
    .pipe(
      switchMap(() => this._reposApiService.publicRepos(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {
      const nextPageLink = res.headers.get('link').match(SINCE_PAGINATION);

      const prevPaginationId = !!this.nextPaginationId ? this.nextPaginationId : this._pageParams.since;
      this.nextPaginationId = nextPageLink.length ? nextPageLink[1] : this.nextPaginationId;

      this._repos = res.body.map((gist: any) => gist && new RepoModel(gist));

      this._updateRouteParam(prevPaginationId);

      this.reposSearchEvent.emit();
    });
  }

  private _updateRouteParam(prev: number): void {
    const newPage: PageParamsSinceModel = {since: this.nextPaginationId};

    this._pageParams = new PageParamsSinceModel(newPage);

    this._router.navigate([], {
      queryParams: {
        since: prev
      }
    });
  }
}
