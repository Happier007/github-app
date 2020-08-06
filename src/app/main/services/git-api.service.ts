// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { IGist } from '@core/interfaces';
import { QueryParamsModel } from '../../core/models/queryParams.model';


@Injectable()
export class GitApiService {

    constructor(private _http: HttpClient) {
    }

    public getGists(url: string, params: QueryParamsModel): Observable<IGist[]> {
        return this._http.get<IGist[]>(`${url}/gists`, {
            params: (params as any)
        });
    }
}
