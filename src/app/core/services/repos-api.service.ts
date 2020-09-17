// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

// CORE
import {
  RepoModel,
  PageParamsModel,
  PageParamsSinceModel
} from '@core/models';
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
  public publicRepos(urlParams: PageParamsSinceModel): any {
    return this._http.get<RepoModel[]>(`${this._apiUrl}/repositories`, {
      params: urlParams as any, observe: 'response'
    });
  }

  /**
   * Get a repository - https://developer.github.com/v3/repos/#get-a-repository
   * @urlParams <string>
   * @return Observable<RepoModel>
   **/
  public publicRepoByName(username: string, reponame: string): Observable<RepoModel> {
    const headers = {
      Accept: 'application/vnd.github.nebula-preview+json'
    };

    return this._http.get<RepoModel>(`${this._apiUrl}/repos/${username}/${reponame}`,
      {
        headers
      })
    .pipe(
      map((gist: RepoModel) => gist && new RepoModel(gist))
    );
  }

  /**
   * List repositories for a user - https://developer.github.com/v3/repos/#list-repositories-for-a-user
   * @urlParams <string>, <PageParamsModel>
   * @return Observable<RepoModel[]>
   **/
  public getUserRepos(username: string, queryParams: PageParamsModel): any {
    return this._http.get<RepoModel[]>(`${this._apiUrl}/users/${username}/repos`,
      {
        params: queryParams as any, observe: 'response'
      });
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
