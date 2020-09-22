// ANGULAR
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';

// RXJS
import {
  map,
  pluck,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';

// CORE
import { CommitsActivityModel, PageParamsModel, RepoModel, UserModel } from '@core/models';
import { groupByProperty } from '@core/helpers';
import { ReposApiService, StatisticsApiService } from '@core/services';


@Injectable()
export class UserCommitsActivityService implements OnDestroy {

  public commitsActivitySearchEvent = new EventEmitter<void>();
  private _user: UserModel;
  private _commitsActivityAllRepos: CommitsActivityModel[] = [];

  private _statisticSubjectSearch = new Subject<void>();
  private _destroyed$ = new Subject<void>();

  constructor(
    private _statisticsApiService: StatisticsApiService,
    private _reposApiService: ReposApiService) {
    this._fetchStatistic();
  }

  public get getCommitsActivity(): CommitsActivityModel[] {
    return this._commitsActivityAllRepos;
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

  private _fetchStatistic(): void {
    this._statisticSubjectSearch
    .pipe(
      switchMap(() => this._reposApiService.getUserRepos(this._user.login, new PageParamsModel())),
      pluck('body'),
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => {
        return this._statisticsApiService.getUserCommitsActivity(this._user.login, repo.name);
      })),
      switchMap((requestList: Observable<any>[]) => {
        return forkJoin(requestList);
      }),
      map((commitsActivities: any[]) => commitsActivities
      .reduce((accCommitsActivity: CommitsActivityModel[], curCommitsActivity: CommitsActivityModel[]) => {
        return [...accCommitsActivity, ...curCommitsActivity];
      }, [])),
      takeUntil(this._destroyed$)
    )
    .subscribe((commitsActivities: CommitsActivityModel[]) => {
      this._commitsActivityAllRepos = this._sumCommitsAllRepos(commitsActivities);

      this.commitsActivitySearchEvent.emit();
    });
  }

  private _sumCommitsAllRepos(commitsActivities: CommitsActivityModel[]): CommitsActivityModel[] {

    const commitsActivityAllRepos: CommitsActivityModel[] = [];

    const commitsActivitiesByWeek = groupByProperty(commitsActivities, x => x.week);

    const weekKeys = Object.keys(commitsActivitiesByWeek);

    weekKeys.forEach((prop: string) => {

      const sumCommitsDays = this._sumCommitsWeekAllRepos(commitsActivitiesByWeek[prop]);

      const resultWeekActivity: CommitsActivityModel = {
        week: new Date(+prop * 1000),
        days: sumCommitsDays
      };

      commitsActivityAllRepos.push(resultWeekActivity);
    });

    return commitsActivityAllRepos;
  }

  private _sumCommitsWeekAllRepos(commitsActivities: CommitsActivityModel[]): number[] {
    const result = [];

    commitsActivities.forEach((commitsActivityWeek: CommitsActivityModel) => result.push(commitsActivityWeek.days));

    return result.reduce((accWeek: number[], currentWeek: number[]) => {
      return this._sumCommits(accWeek, currentWeek);
    });
  }

  private _sumCommits(accDays: number[], curDays: number[]): number[] {
    return accDays.map((item: number, idx: number) => item + (curDays[idx] || 0));
  }
}
