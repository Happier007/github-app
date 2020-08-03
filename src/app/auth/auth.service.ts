import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../core/interfaces/token.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private gitUrl = 'https://github.com/login';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router) {
    }

    public redirectToGitHub(login: string) {
        const queryParams = {
            client_id: environment.clientId,
            redirect_uri: environment.redirectUri,
            login
        };

        const urlTree = this.router.createUrlTree(['oauth/authorize/'], {
            queryParams
        });

        location.href = `${this.gitUrl}/${urlTree.toString()}`;
    }

    public getToken(code: string): Observable<IToken> {
        const headers = {
            Accept: 'application/json'
        };

        const params = {
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            code,
            redirect_uri: environment.redirectUri
        };

        return this.http.post<IToken>('/login/oauth/access_token', params, {headers})
            .pipe(
                map((response: any) => response)
            );
    }
}
