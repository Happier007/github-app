// ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import {
  GistModel,
  PageParamsModel,
  UserModel
} from '@core/models';
import { GistsApiService } from '@core/services';
import { PAGE_SIZE_OPTIONS } from '@core/utils';
import { getLengthPagination } from '@core/helpers';


@Component({
  selector: 'app-user-gists',
  templateUrl: './user-gists.component.html',
  styleUrls: ['./user-gists.component.scss']
})
export class UserGistsComponent implements OnInit, OnDestroy {

  @Input() user: UserModel;

  public pageParams: PageParamsModel = new PageParamsModel();
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public gists: GistModel[] = [];
  public gistsCount: number;

  private _destroyed$ = new Subject<void>();

  constructor(private _gistsApiService: GistsApiService) {
  }

  public ngOnInit(): void {
    this._fetchGists();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEvent(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this._fetchGists();
  }

  private _fetchGists(): void {
    const pageParams = Object.assign({}, this.pageParams);
    pageParams.page++;

    this._gistsApiService.getUserGists(this.user.login, pageParams)
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {

      this.gists = res.body.map((gist: any) => gist && new GistModel(gist));

      if (!this.user.publicGists) {
        this.gistsCount = getLengthPagination(res.headers);
      }
    });
  }
}
