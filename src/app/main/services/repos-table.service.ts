// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import {
  RepoModel,
  PageParamsSinceModel,
  PaginationModel
} from '@core/models';
import { ReposApiService } from '@core/services';
import { getPaginationParams } from '@core/helpers';


@Injectable()
export class ReposTableService implements OnDestroy {

  public reposSearchEvent = new EventEmitter<void>();
  public pagination: PaginationModel = new PaginationModel();

  private _pageParams: PageParamsSinceModel = new PageParamsSinceModel(this._route.snapshot.queryParams);
  private _repos: RepoModel[] = [];
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
    this.pagination.nextPaginationId = this._pageParams.since = since;

    this.getRepos();
  }

  private _fetchRepos(): void {
    this._reposSearchSubject
    .pipe(
      switchMap(() => this._reposApiService.publicRepos(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {

      this._repos = res.body.map((gist: any) => gist && new RepoModel(gist));

      getPaginationParams(res.headers, this.pagination, this._pageParams.since);

      this._updateRouteParam();

      this.reposSearchEvent.emit();
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
