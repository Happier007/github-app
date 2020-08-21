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
   * @return Observable<IGist[]>
   **/
  public getGists(urlParams: PageParamsModel): Observable<GistModel[]> {
    return this._http.get<GistModel[]>(`${this._gitApiUrl}/gists/public`, {params: urlParams as any})
    .pipe(
      map((gists: GistModel[]) => gists.map((gist: GistModel) => gist && new GistModel(gist)))
    );
  }

  /**
   * get gist by id - https://developer.github.com/v3/gists/#get-a-gist
   * @urlParams <string>
   * @return Observable<GistModel>
   **/
  public gistById(idGist: string): Observable<GistModel> {
    return this._http.get<GistModel>(`${this._gitApiUrl}/gists/${idGist}`)
    .pipe(
      map((gist: GistModel) => gist && new GistModel(gist))
    );
  }
}
