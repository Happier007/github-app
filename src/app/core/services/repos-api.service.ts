// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

// CORE
import { RepoModel, PageParamsModel, GistModel } from '@core/models';
import { BaseApiService } from './base-api.service';

@Injectable()
export class ReposApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  /**
   * List public repositories - https://developer.github.com/v3/repos/#list-public-repositories
   * @urlParams <PageParamsModel>
   * @return Observable<RepoModel[]>
   **/
  public publicRepos(urlParams: PageParamsModel): Observable<RepoModel[]> {
    return this._http.get<RepoModel[]>(`${this._apiUrl}/repositories`, {params: urlParams as any})
    .pipe(
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => repo && new RepoModel(repo))
      )
    );
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
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => new RepoModel(repo)))
    );
  }

  public searchReposByName(queryParams: PageParamsModel): Observable<RepoModel[]> {
    return this._http.get<RepoModel[]>(`${this._apiUrl}/search/repositories`,
      {
        params: queryParams as any
      })
    .pipe(
      pluck('items'),
      map((repos: RepoModel[]) => repos && repos.map((repo: RepoModel) => new RepoModel(repo)))
    );
  }

}
