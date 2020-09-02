// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { CommentsActivityModel } from '@core/models';
import { BaseApiService } from './base-api.service';


@Injectable()
export class StatisticsApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  /**
   * Get the last year of commit activity - https://developer.github.com/v3/repos/statistics/#get-the-last-year-of-commit-activity
   * @urlParams <string>
   * @return Observable<CommentsActivityModel[]>
   **/
  public getUserCommitActivity(username: string, repo: string): Observable<CommentsActivityModel[]> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };
    return this._http.get<CommentsActivityModel[]>(`${this._apiUrl}/repos/${username}/${repo}/stats/commit_activity`,
      {
        headers,
      }
    );
  }
}
