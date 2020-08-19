// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// MATERIAL
import { PageEvent } from '@angular/material/paginator';

// CORE
import { GitApiService } from '@core/services';
import { PageParamsModel } from '@core/models';
import { IGist } from '../../../../core/interfaces/gist.interface';
import { COUNT_GISTS } from '@core/utils';

@Component({
  selector: 'app-gists-list',
  templateUrl: './gists-list.component.html',
  styleUrls: ['./gists-list.component.scss']
})
export class GistsListComponent implements OnInit {

  public gists$: Observable<IGist[]>;
  public countGists = COUNT_GISTS;
  public displayedColumns: string[] = ['description', 'login'];
  public pageParams: PageParamsModel = new PageParamsModel();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _gitApiService: GitApiService) {
  }

  public ngOnInit(): void {
    this._initPageParams();
    this.fetchGists(new PageParamsModel());
  }

  public fetchGists(pageParams): void {
    this.gists$ = this._gitApiService.getGists(pageParams);
  }

  public pageEventGists(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this._router.navigate([], {
      queryParams: {
        page: this.pageParams.page,
        per_page: this.pageParams.perPage,
      }
    });

    this.fetchGists(this.pageParams);
  }

  public selectRow(row: IGist): void {
    console.log(row.description);
  }

  private _initPageParams(): void {
    this.pageParams = new PageParamsModel((this._route.snapshot.queryParamMap as any).params);

    this._router.navigate([], {
      queryParams: {
        page: this.pageParams.page,
        per_page: this.pageParams.perPage,
      }
    });
  }
}
