// ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import {
  PageParamsModel,
  RepoModel,
  UserModel
} from '@core/models';
import { PAGE_SIZE_OPTIONS } from '@core/utils';
import { ReposApiService } from '@core/services';

import { getLengthPagination } from '@core/helpers';


@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit, OnDestroy {

  @Input() user: UserModel;


  public pageParams: PageParamsModel = new PageParamsModel();
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public repos: RepoModel[] = [];
  public reposCount: number;

  private _destroyed$ = new Subject<void>();

  constructor(private _reposApiService: ReposApiService) {
  }

  public ngOnInit(): void {
    this._fetchRepos();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEvent(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this._fetchRepos();
  }


  private _fetchRepos(): void {
    const pageParams = Object.assign({}, this.pageParams);
    pageParams.page++;

    this._reposApiService.getUserRepos(this.user.login, pageParams)
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((res: any) => {

      this.repos = res.body.map((repo: any) => repo && new RepoModel(repo));

      if (!this.user.publicRepos) {
        this.reposCount = getLengthPagination(res.headers);
      }
    });
  }
}
