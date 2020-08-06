// ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { IProfile, IToken } from '@core/interfaces';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class UserAuthService {

    private _gitUrl = 'https://github.com/login';

    constructor(
        private _http: HttpClient,
        private _router: Router) {
    }

    public authentication(login: string): void {
        const queryParams = {
            client_id: environment.clientId,
            redirect_uri: environment.redirectUri,
            login
        };

        const urlTree = this._router.createUrlTree(['oauth/authorize/'], {
            queryParams
        });

        location.href = `${this._gitUrl}/${urlTree.toString()}`;
    }

    public getToken(code: string): Observable<IToken> {
        const headers = {
            Accept: 'application/json'
        };

        const bodyParams = {
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            code,
            redirect_uri: environment.redirectUri
        };

        return this._http.post<IToken>('/login/oauth/access_token', bodyParams, {headers})
            .pipe(
                map((response: any) => response)
            );
    }

    public getAuthenticatedUser(token: string): Observable<IProfile> {
        const headers = {
            Authorization: `token ${token}`
        };
        return this._http.get<IProfile>('https://api.github.com/user', {headers});
    }
}
