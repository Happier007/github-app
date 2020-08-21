// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { GistModel, PageParamsModel } from '@core/models';
import { GistsApiService } from '@core/services';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class GistsService {

  private _pageParams: PageParamsModel = new PageParamsModel(this._route.snapshot.queryParams);
  private _gists$: Observable<GistModel[]> = this._gistsApiService.publicGists(this._pageParams);

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _gistsApiService: GistsApiService) {
  }

  public pageEvent(event?: PageEvent | object): void {
    this._pageParams = new PageParamsModel(event);

    this._updateRouteParam(this._pageParams);

    this.fetchGists();
  }

  public fetchGists(): void {
    this._gists$ = this._gistsApiService.publicGists(this._pageParams);
  }

  public get page(): PageParamsModel {
    this._updateRouteParam(this._pageParams);

    return this._pageParams;
  }

  public get gists(): Observable<GistModel[]> {
    return this._gists$;
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

