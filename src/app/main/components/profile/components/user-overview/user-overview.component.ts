// ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { StatisticsApiService } from '@core/services';
import { CommentsActivityModel, UserModel } from '@core/models';

// MAIN
import { UserCommitsActivityService } from '../../../../services';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {

  @Input() user: UserModel;

  public commentsActivityAllRepos: CommentsActivityModel[] = [];

  private _destroyed$ = new Subject<void>();

  constructor(private _statisticsApiService: StatisticsApiService,
              private _userCommitsActivityService: UserCommitsActivityService) {
  }

  public ngOnInit(): void {
    this._fetchStatistic();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _fetchStatistic(): void {
    this._statisticsApiService.getUserCommitActivity(this.user.login)
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe((commentsActivities: CommentsActivityModel[]) => {

      this.commentsActivityAllRepos = this._userCommitsActivityService.sumCommitsAllRepos(commentsActivities);
    });
  }
}




