// ANGULAR
import { Component, OnInit } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

// CORE
import {
  COUNT_GISTS,
  PAGE_SIZE_OPTIONS
} from '@core/utils';

import {
  GistModel,
  PageParamsModel,
} from '@core/models';

// CURRENT
import { GistsService } from '../../../services';


@Component({
  selector: 'app-gists-table',
  templateUrl: './gists-table.component.html',
  styleUrls: ['./gists-table.component.scss']
})
export class GistsTableComponent {

  public pageParams: PageParamsModel = this._gistsService.page;
  public gists$: Observable<GistModel[]> = this._gistsService.gists;

  public countGists = COUNT_GISTS;
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public displayedColumns: string[] = ['description', 'login'];

  constructor(
    private _gistsService: GistsService) {
  }

  public pageEventGists(event: PageEvent): void {
    this._gistsService.pageEvent(event);

    this.gists$ = this._gistsService.gists;

    this.pageParams = this._gistsService.page;
  }
}
