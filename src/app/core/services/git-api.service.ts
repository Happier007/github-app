// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { IGist } from '../interfaces/gist.interface';
import { PageParamsModel } from '@core/models';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class GitApiService {

  constructor(private _http: HttpClient) {}

  /**
   * get public gists - https://developer.github.com/v3/gists/#list-public-gists
   * @urlParams <PageParamsModel>
   * @return Observable<IGist[]>
   **/
  public getGists(urlParams: PageParamsModel): Observable<IGist[]> {
    return this._http.get<IGist[]>(`${environment.gitApiUrl}/gists/public`, {params: urlParams as any});
  }

  /**
   * get gist by id - https://developer.github.com/v3/gists/#get-a-gist
   * @urlParams <string>
   * @return Observable<IGist>
   **/
  public gistById(idGist: string): Observable<IGist> {
    return this._http.get<IGist>(`${environment.gitApiUrl}/gists/${idGist}`);
  }
}
