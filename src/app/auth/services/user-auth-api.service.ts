// ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { UserModel, TokenModel } from '@core/models';

@Injectable()
export class UserAuthApiService {

    private _gitUrl = 'https://github.com/login';
    private _gitApiUrl = 'https://api.github.com';

    constructor(
        private _http: HttpClient,
        private _router: Router) {
    }

    public authentication(queryParams: any): void {

        const urlTree = this._router.createUrlTree(['oauth/authorize/'], {
            queryParams
        });

        location.href = `${this._gitUrl}/${urlTree.toString()}`;
    }

    public getToken(bodyParams: any): Observable<TokenModel> {
        const headers = {
            Accept: 'application/json'
        };

        return this._http.post<TokenModel>('/login/oauth/access_token', bodyParams, {headers})
            .pipe(
                map((response: any) => response)
            );
    }

    public getAuthenticatedUser(token: string): Observable<UserModel> {
        const headers = {
            Authorization: `token ${token}`
        };
        return this._http.get<UserModel>(`${this._gitApiUrl}/user`, {headers});
    }
}
