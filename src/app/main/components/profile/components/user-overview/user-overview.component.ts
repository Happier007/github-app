// ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { StatisticsApiService } from '@core/services';
import { CommentsActivityModel, UserModel } from '@core/models';


@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {

  @Input() user: UserModel;

  public commentsActivityAllRepos: CommentsActivityModel[] = [];

  private _destroyed$ = new Subject<void>();

  constructor(private _statisticsApiService: StatisticsApiService) {
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

      const commentsActivitiesByWeek = this._groupByWeek(commentsActivities, x => x.week);

      const weekKeys = Object.keys(commentsActivitiesByWeek);

      weekKeys.forEach((prop: string) => {

        const resultWeekActivity: CommentsActivityModel = {
          week: new Date(prop * 1000),
          days: this._sumCommitsWeekAllRepos(commentsActivitiesByWeek[prop])
        };

        this.commentsActivityAllRepos.push(resultWeekActivity);
      });

    });
  }

  // lodash
  private _groupByWeek(xs: CommentsActivityModel[], f: object): any[] {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), []);
  }

  private _sumCommitsWeekAllRepos(commentsActivities: CommentsActivityModel[]): number[] {
    const result = [];

    commentsActivities.forEach((commentsActivityWeek: CommentsActivityModel) => result.push(commentsActivityWeek.days));

    return result.reduce((accWeek: number[], currentWeek: number[]) => {
      return this._sumCommits(accWeek, currentWeek);
    });
  }

  private _sumCommits(a: number[], b: number[]): number[] {
    return a.map((item: number, idx: number) => item + (b[idx] || 0));
  }
}




