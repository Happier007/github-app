// ANGULAR
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// CORE
import { PageParamsModel } from '@core/models';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class PaginationService {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute) {
  }

  public updatePageParams(event: PageEvent | object): PageParamsModel {
    const pageParams = new PageParamsModel(event);
    this._updateRouteParam(pageParams);
    return pageParams;
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

