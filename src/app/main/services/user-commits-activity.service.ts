// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';

// RXJS
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { CommentsActivityModel, UserModel } from '@core/models';
import { groupByProperty } from '@core/helpers';
import { StatisticsApiService } from '@core/services';


@Injectable()
export class UserCommitsActivityService implements OnDestroy {

  public commentsActivitySearchEvent = new EventEmitter<void>();
  private _user: UserModel;
  private _commentsActivityAllRepos: CommentsActivityModel[] = [];

  private _statisticSubjectSearch = new Subject<void>();
  private _destroyed$ = new Subject<void>();

  constructor(
    private _statisticsApiService: StatisticsApiService) {
    this._startFetchStatistic();
  }

  public get getCommentsActivity(): CommentsActivityModel[] {
    return this._commentsActivityAllRepos;
  }

  public set user(user: UserModel) {
    this._user = user;
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public getStatistic() {
    this._statisticSubjectSearch.next();
  }

  private _startFetchStatistic(): void {
    this._statisticSubjectSearch
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(
      () => this._fetchStatistic()
    );
  }

  private _fetchStatistic(): void {
    this._statisticsApiService.getUserCommitActivity(this._user.login)
    .pipe(
      map((commentsActivities: any[]) => commentsActivities
      .reduce((accCommentsActivity: CommentsActivityModel[], curCommentsActivity: CommentsActivityModel[]) => {
        return [...accCommentsActivity, ...curCommentsActivity];
      }, [])),
      takeUntil(this._destroyed$)
    )
    .subscribe((commentsActivities: CommentsActivityModel[]) => {
      this._commentsActivityAllRepos = this._sumCommitsAllRepos(commentsActivities);

      this.commentsActivitySearchEvent.emit();
    });
  }

  private _sumCommitsAllRepos(commentsActivities: CommentsActivityModel[]): CommentsActivityModel[] {

    const commentsActivityAllRepos: CommentsActivityModel[] = [];

    const commentsActivitiesByWeek = groupByProperty(commentsActivities, x => x.week);

    const weekKeys = Object.keys(commentsActivitiesByWeek);

    weekKeys.forEach((prop: string) => {

      const sumCommitsDays = this._sumCommitsWeekAllRepos(commentsActivitiesByWeek[prop]);

      const resultWeekActivity: CommentsActivityModel = {
        week: new Date(+prop * 1000),
        days: sumCommitsDays
      };

      commentsActivityAllRepos.push(resultWeekActivity);
    });

    return commentsActivityAllRepos;
  }

  private _sumCommitsWeekAllRepos(commentsActivities: CommentsActivityModel[]): number[] {
    const result = [];

    commentsActivities.forEach((commentsActivityWeek: CommentsActivityModel) => result.push(commentsActivityWeek.days));

    return result.reduce((accWeek: number[], currentWeek: number[]) => {
      return this._sumCommits(accWeek, currentWeek);
    });
  }

  private _sumCommits(accDays: number[], curDays: number[]): number[] {
    return accDays.map((item: number, idx: number) => item + (curDays[idx] || 0));
  }
}
