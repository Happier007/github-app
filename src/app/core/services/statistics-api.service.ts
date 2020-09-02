// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { CommitsActivityModel } from '@core/models';
import { BaseApiService } from './base-api.service';


@Injectable()
export class StatisticsApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  /**
   * Get the last year of commit activity - https://developer.github.com/v3/repos/statistics/#get-the-last-year-of-commit-activity
   * @urlParams <string>
   * @return Observable<CommitsActivityModel[]>
   **/
  public getUserCommitsActivity(username: string, repo: string): Observable<CommitsActivityModel[]> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };
    return this._http.get<CommitsActivityModel[]>(`${this._apiUrl}/repos/${username}/${repo}/stats/commit_activity`,
      {
        headers,
      }
    );
  }
}
