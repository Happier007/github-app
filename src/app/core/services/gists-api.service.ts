// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { GistModel, PageParamsModel } from '@core/models';
import { BaseApiService } from './base-api.service';

@Injectable()
export class GistsApiService extends BaseApiService {

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  /**
   * get public gists - https://developer.github.com/v3/gists/#list-public-gists
   * @urlParams <PageParamsModel>
   * @return Observable<GistModel[]>
   **/
  public publicGists(urlParams: PageParamsModel): Observable<GistModel[]> {
    return this._http.get<GistModel[]>(`${this._apiUrl}/gists/public`, {params: urlParams as any})
    .pipe(
      map((gists: GistModel[]) => gists && gists.map((gist: GistModel) => gist && new GistModel(gist))
      )
    );
  }

  /**
   * get gist by id - https://developer.github.com/v3/gists/#get-a-gist
   * @urlParams <string>
   * @return Observable<GistModel>
   **/
  public publicGistById(id: string): Observable<GistModel> {
    return this._http.get<GistModel>(`${this._apiUrl}/gists/${id}`)
    .pipe(
      map((gist: GistModel) => gist && new GistModel(gist))
    );
  }

  /**
   * List gists for a user- https://developer.github.com/v3/gists/#list-gists-for-a-user
   * @urlParams <string>, <PageParamsModel>
   * @return Observable<GistModel[]>
   **/
  public getUserGists(username: string, queryParams: PageParamsModel): Observable<GistModel[]> {
    return this._http.get<GistModel[]>(`${this._apiUrl}/users/${username}/gists`,
      {
        params: queryParams as any
      })
    .pipe(
      map((gists: GistModel[]) => gists && gists.map((gist: GistModel) => new GistModel(gist)))
    );
  }
}
