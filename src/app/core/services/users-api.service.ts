// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

// CORE
import { PageParamsModel, PageParamsSinceModel, UserPublicModel } from '@core/models';
import { BaseApiService } from './base-api.service';


@Injectable()
export class UsersApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  /**
   * List users - https://developer.github.com/v3/users/#list-users
   * @urlParams <PageParamsModel>
   * @return Observable<UserPublicModel[]>
   **/
  public usersList(urlParams: PageParamsSinceModel): any {
    return this._http.get<UserPublicModel[]>(`${this._apiUrl}/users`, {
      params: urlParams as any,
      observe: 'response'
    });
  }

    /**
   * Get a user - https://developer.github.com/v3/users/#get-a-user
   * @urlParams <string>
   * @return Observable<UserPublicModel[]>
   **/
  public getUser(name: string): Observable<UserPublicModel> {
    return this._http.get<UserPublicModel>(`${this._apiUrl}/users/${name}`)
    .pipe(
      map((user: UserPublicModel) => user && new UserPublicModel(user))
    );
  }

  /**
   * Get user by name - https://developer.github.com/v3/users/#get-a-user
   * @urlParams <string>
   * @return Observable<UserPublicModel>
   **/
  public searchUsersByName(queryParams: PageParamsModel): Observable<UserPublicModel[]> {
    return this._http.get<UserPublicModel[]>(`${this._apiUrl}/search/users`,
      {
        params: queryParams as any
      })
    .pipe(
      pluck('items'),
      map((users: UserPublicModel[]) => users && users.map((user: UserPublicModel) => new UserPublicModel(user)))
    );
  }
}
