// ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { StatisticsApiService } from '@core/services';
import { CommitsActivityModel, UserModel } from '@core/models';

// MAIN
import { UserCommitsActivityService } from '../../../../services';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit, OnDestroy {

  @Input()
  public set user(user: UserModel) {
    this._userCommitsActivityService.user = user;
  }

  public commentsActivityAllRepos: CommitsActivityModel[] = [];

  private _destroyed$ = new Subject<void>();

  constructor(
    private _statisticsApiService: StatisticsApiService,
    private _userCommitsActivityService: UserCommitsActivityService) {
  }

  public ngOnInit(): void {
    this._userCommitsActivityService.getStatistic();

    this._subSearchEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private _subSearchEvent(): void {
    this._userCommitsActivityService.commentsActivitySearchEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {
      this.commentsActivityAllRepos = this._userCommitsActivityService.getCommentsActivity;
    });
  }
}




