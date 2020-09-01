// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// CORE
import { CommentsActivityModel, PageParamsModel, RepoModel } from '@core/models';
import { BaseApiService } from './base-api.service';
import { ReposApiService } from './repos-api.service';


@Injectable()
export class StatisticsApiService extends BaseApiService {

  constructor(private _http: HttpClient,
              private _reposApiService: ReposApiService) {
    super();
  }

  public getUserCommitActivity(username: string): Observable<CommentsActivityModel[]> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };

    return this._reposApiService.getUserRepos(username, new PageParamsModel())
    .pipe(
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => {
        return this._http.get(`${this._apiUrl}/repos/${username}/${repo.name}/stats/commit_activity`,
          {
            headers,
          });
      })),
      switchMap((value: any) => {
        return forkJoin(value);
      }),
      map((commentsActivities: any[]) => commentsActivities
      .reduce((accCommentsActivity: CommentsActivityModel[], curCommentsActivity: CommentsActivityModel[]) => {
        return [...accCommentsActivity, ...curCommentsActivity];
      }, [])),
    );
  }
}
