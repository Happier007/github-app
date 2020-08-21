// ANGULAR
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// CORE
import { GistModel, PageParamsModel } from '@core/models';
import { GistsApiService } from '@core/services';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class GistsService {

  public gistsSearchEvent = new EventEmitter<void>();

  private _gists$: GistModel[] = [];
  private _gistsSearchSubject$ = new Subject<void>();
  private _pageParams: PageParamsModel = new PageParamsModel(this._route.snapshot.queryParams);

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _gistsApiService: GistsApiService) {
    this.fetchGists();
    this._updateRouteParam(this._pageParams);
  }

  public get page(): PageParamsModel {
    return this._pageParams;
  }
  public get gists(): GistModel[] {
    return this._gists$;
  }

  public getGists(): void {
    this._gistsSearchSubject$.next();
  }

  public pageEvent(event?: PageEvent | object): void {
    this._pageParams = new PageParamsModel(event);

    this._updateRouteParam(this._pageParams);

    this.getGists();
  }

  public fetchGists(): void {
    this._gistsSearchSubject$
    .pipe(
      switchMap(() => this._gistsApiService.publicGists(this._pageParams))
    )
    .subscribe((gists: GistModel[]) => {
      this._gists$ = gists.slice();

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

