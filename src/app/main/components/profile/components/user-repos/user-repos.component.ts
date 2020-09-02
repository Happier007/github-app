// ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { PageParamsModel, RepoModel, UserModel } from '@core/models';
import { PAGE_SIZE_OPTIONS } from '@core/utils';
import { ReposApiService } from '@core/services';


@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit {

  @Input() user: UserModel;

  public pageParams: PageParamsModel = new PageParamsModel();
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public repos$: Observable<RepoModel[]>;

  constructor(private _reposApiService: ReposApiService) {
  }

  public ngOnInit(): void {
    this._fetchRepos();
  }

  public pageEvent(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this._fetchRepos();
  }

  private _fetchRepos(): void {
    this.repos$ = this._reposApiService.getUserRepos(this.user.login, this.pageParams);
  }
}
