import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGist } from '../interfaces/gist.interface';
import { QueryParamsModel } from '../models/queryParams.model';
import { environment } from '@environments/environment';

@Injectable()
export class GitApiService {

  constructor(private _http: HttpClient) {
  }

  public getGists(urlParams: QueryParamsModel): Observable<IGist[]> {
    return this._http.get<IGist[]>(`${environment.gitApiUrl}/gists/public`, {params: urlParams as any});
  }
}
