// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { GistModel, PageParamsModel } from '@core/models';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class ProjectsApiService {

  constructor(private _http: HttpClient) {
  }

  public getUserProjects(username: string, queryParams: PageParamsModel): Observable<any[]> {
    return this._http.get<GistModel[]>(`${environment.gitApiUrl}/users/${username}/projects`,
      {
        params: queryParams as any
      });
    // .pipe(
    //   map((gists: GistModel[]) => gists.map((gist: GistModel) => new GistModel(gist)))
    // );
  }

}
