// ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { UserModel, TokenModel } from '@core/models';
import { IClient } from '@core/interfaces';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class UserAuthApiService {

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {}

    /**
     * Request a user's GitHub identity - https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
     * @queryParams <IClient>
     * @return void
     **/
    public authentication(queryParams: IClient): void {
        window.location.href = `${environment.gitUrl}/login/oauth/authorize?client_id=${queryParams.clientId}&redirect_uri=${queryParams.redirectUri}&login=${queryParams.login}`;
    }

    /**
     * Get Token - https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
     * @bodyParams <IClient>
     * @return Observable<TokenModel>
     **/
    public getToken(bodyParams: IClient): Observable<TokenModel> {
        const headers = {
            Accept: 'application/json'
        };

        return this._http.post<TokenModel>('/login/oauth/access_token', bodyParams, {headers})
            .pipe(
                map((token: TokenModel) => token && new TokenModel(token))
            );
    }

    /**
     * Get authenticated user - https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
     * @return Observable<UserModel>
     **/
    public getAuthenticatedUser(token: string): Observable<UserModel> {
        const headers = {
            Authorization: `token ${token}`
        };

        return this._http.get<UserModel>(`${environment.gitApiUrl}/user`, {headers})
            .pipe(
                map((user: UserModel) => user && new UserModel(user))
            );
    }
}

