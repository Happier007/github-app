// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// CORE
import { GistModel, PageParamsModel } from '@core/models';
import { GistsApiService } from '@core/services';


@Injectable()
export class GistsService implements OnDestroy {

  public gistsSearchEvent = new EventEmitter<void>();

  private _gists: GistModel[] = [];
  private _gistsSearchSubject$ = new Subject<void>();
  private _pageParams: PageParamsModel = new PageParamsModel(this._route.snapshot.queryParams);
  private _destroyed$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _gistsApiService: GistsApiService) {
    this._fetchGists();
    this._updateRouteParam(this._pageParams);
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public get page(): PageParamsModel {
    return this._pageParams;
  }

  public get gists(): GistModel[] {
    return this._gists;
  }

  public getGists(): void {
    this._gistsSearchSubject$.next();
  }

  public pageEvent(event?: PageEvent | object): void {
    this._pageParams = new PageParamsModel(event);

    this._updateRouteParam(this._pageParams);

    this.getGists();
  }

  private _fetchGists(): void {
    this._gistsSearchSubject$
    .pipe(
      switchMap(() => this._gistsApiService.publicGists(this._pageParams)),
      takeUntil(this._destroyed$)
    )
    .subscribe((gists: GistModel[]) => {
      this._gists = gists;

      this.gistsSearchEvent.emit();
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

