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
        private _router: Router) {
    }

    public authentication(queryParams: any): void {
        const urlTree = this._router.createUrlTree(['oauth/authorize/'], {
            queryParams
        });

        location.href = `${environment.gitUrl}/login/${urlTree.toString()}`;
    }

    public getToken(bodyParams: any): Observable<TokenModel> {
        const headers = {
            Accept: 'application/json'
        };

        return this._http.post<TokenModel>('/login/oauth/access_token', bodyParams, {headers})
            .pipe(
                map((token: TokenModel) => {
                    if (token) {
                        return new TokenModel(token);
                    }
                })
            );
    }

    public getAuthenticatedUser(token: string): Observable<UserModel> {
        const headers = {
            Authorization: `token ${token}`
        };

        return this._http.get<UserModel>(`${environment.gitApiUrl}/user`, {headers})
            .pipe(
                map((user: UserModel) => {
                    if (user) {
                        return new UserModel(user);
                    }
                })
            );
    }
}

