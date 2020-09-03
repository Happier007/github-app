// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import { PageParamsModel, RepoModel } from '@core/models';
import { ReposApiService } from '@core/services';


@Injectable()
export class ReposService implements OnDestroy {

  public reposSearchEvent = new EventEmitter<void>();

  private _repos: RepoModel[] = [];
  private _pageParams: PageParamsModel = new PageParamsModel(this._route.snapshot.queryParams);
  private _reposSearchSubject = new Subject<void>();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _reposApiService: ReposApiService) {
    this._fetchRepos();
  }

  public repos(): RepoModel[] {
    return this._repos;
  }

  public getPage(): PageParamsModel {
    return this._pageParams;
  }

  public getRepos(): void {
    this._reposSearchSubject.next();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEvent(event?: PageEvent | object): void {
    this._pageParams = new PageParamsModel(event);

    this.getRepos();
  }

  private _fetchRepos(): void {
    this._reposSearchSubject
    .pipe(
      switchMap(() => this._reposApiService.publicRepos(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((repos: RepoModel[]) => {
      this._repos = repos;

      this.reposSearchEvent.emit();

      this._updateRouteParam(this._pageParams);
    });
  }
  
  private _updateRouteParam(pageParams: PageParamsModel): void {
    this._router.navigate([], {
      queryParams: {
        page: pageParams.page,
        per_page: pageParams.perPage,
      }
    });
  }
}
