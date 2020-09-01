// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { RepoModel, PageParamsModel } from '@core/models';
import { BaseApiService } from './base-api.service';

@Injectable()
export class ReposApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  /**
   * List repositories for a user - https://developer.github.com/v3/repos/#list-repositories-for-a-user
   * @urlParams <string>, <PageParamsModel>
   * @return Observable<RepoModel[]>
   **/
  public getUserRepos(username: string, queryParams: PageParamsModel): Observable<RepoModel[]> {
    return this._http.get<RepoModel[]>(`${this._apiUrl}/users/${username}/repos`,
      {
        params: queryParams as any
      })
    .pipe(
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => new RepoModel(repo))
      .filter(Boolean)
      )
    );
  }
}
