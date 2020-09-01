// ANGULAR
import { Injectable } from '@angular/core';

// CORE
import { CommentsActivityModel } from '@core/models';
import { groupByProperty } from '@core/helpers';


@Injectable()
export class UserCommitsActivityService {

  public sumCommitsAllRepos(commentsActivities: CommentsActivityModel[]): CommentsActivityModel[] {

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
