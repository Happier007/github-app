// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { CommentsActivityModel } from '@core/models';
import { BaseApiService } from './base-api.service';
import { map } from 'rxjs/operators';


@Injectable()
export class StatisticsApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  public getUserCommitActivity(username: string): Observable<CommentsActivityModel[]> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };

    return this._http.get<CommentsActivityModel[]>(`${this._apiUrl}/repos/Happier007/git-searcher/stats/commit_activity`,
      {
        headers,
      })
    .pipe(
      map((commentsActivity: CommentsActivityModel[]) => commentsActivity && commentsActivity.map((activityWeek: CommentsActivityModel) => {
        return new CommentsActivityModel(activityWeek);
      }))
    );
  }
}


