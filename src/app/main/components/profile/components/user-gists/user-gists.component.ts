// ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { GistModel, PageParamsModel, UserModel } from '@core/models';
import { GistsApiService } from '@core/services';
import { PAGE_SIZE_OPTIONS } from '@core/utils';


@Component({
  selector: 'app-user-gists',
  templateUrl: './user-gists.component.html',
  styleUrls: ['./user-gists.component.scss']
})
export class UserGistsComponent implements OnInit {

  @Input() user: UserModel;

  public pageParams: PageParamsModel = new PageParamsModel();
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public gists$: Observable<GistModel[]>;

  constructor(private _gistsApiService: GistsApiService) {
  }

  public ngOnInit(): void {
    this._fetchGists();
  }

  public pageEvent(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this._fetchGists();
  }

  private _fetchGists(): void {
    this.gists$ = this._gistsApiService.getUserGists(this.user.login, this.pageParams);
  }
}
