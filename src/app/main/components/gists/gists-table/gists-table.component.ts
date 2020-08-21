// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

// CORE
import { GistsApiService } from '@core/services';

import {
  COUNT_GISTS,
  PAGE_SIZE_OPTIONS
} from '@core/utils';

import {
  GistModel,
  PageParamsModel,
} from '@core/models';
import { PaginationService } from '../../../services/pagination.service';


@Component({
  selector: 'app-gists-table',
  templateUrl: './gists-table.component.html',
  styleUrls: ['./gists-table.component.scss']
})
export class GistsTableComponent implements OnInit {

  public gists$: Observable<GistModel[]>;
  public countGists = COUNT_GISTS;
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public displayedColumns: string[] = ['description', 'login'];
  public pageParams: PageParamsModel = new PageParamsModel();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _gistsApiService: GistsApiService,
    private _paginationService: PaginationService) {
  }

  public ngOnInit(): void {
    this._initPageParams();
  }

  public pageEventGists(event: PageEvent): void {
    this.pageParams = this._paginationService.updatePageParams(event);
    this._fetchGists(this.pageParams);
  }

  public selectRow(row: GistModel): void {
    this._router.navigate(['/gist', row.id]);
  }

  private _initPageParams(): void {
    const queryParams = this._route.snapshot.queryParams;
    this.pageParams = this._paginationService.updatePageParams(queryParams);
    this._fetchGists(new PageParamsModel());
  }

  private _fetchGists(pageParams: PageParamsModel): void {
    this.gists$ = this._gistsApiService.getGists(pageParams);
  }
}
