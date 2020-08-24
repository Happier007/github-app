// ANGULAR
import { Component, OnInit } from '@angular/core';

// CORE
import { COUNT_GISTS, PAGE_SIZE_OPTIONS } from '@core/utils';
import { GistModel, PageParamsModel, } from '@core/models';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// CURRENT
import { GistsService } from '../../../services';


@Component({
  selector: 'app-gists-table',
  templateUrl: './gists-table.component.html',
  styleUrls: ['./gists-table.component.scss'],
})
export class GistsTableComponent implements OnInit {

  public pageParams: PageParamsModel = new PageParamsModel();
  public gists: GistModel[] = [];

  public dataSource = new MatTableDataSource([]);

  public countGists = COUNT_GISTS;
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public displayedColumns: string[] = ['description', 'login'];

  constructor(
    private _gistsService: GistsService
  ) {}

  public get getGistList(): GistModel[] {
    return this._gistsService.gists;
  }
  public get page(): PageParamsModel {
    return this._gistsService.page;
  }

  public ngOnInit(): void {
    this._gistsService.getGists();

    this._subSearchEvent();
  }

  public pageEventGists(event: PageEvent): void {
    this._gistsService.pageEvent(event);
  }

  private _subSearchEvent(): void {
    this._gistsService.gistsSearchEvent
      .pipe()
      .subscribe(() => {
        this.dataSource.data = this.getGistList.slice();

        this.pageParams = this.page;
      });
  }
}
