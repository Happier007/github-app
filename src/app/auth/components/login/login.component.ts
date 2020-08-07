// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { UserModel, TokenModel } from '@core/models';
import { IClient } from '@core/interfaces';

// AUTH
import { UserAuthApiService } from '../../services';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public username = new FormControl('', Validators.required);

    private _clientParams: IClient = {
        client_id: environment.clientId,
        redirect_uri: environment.redirectUri,
    };

    private _destroyed$ = new Subject<void>();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userAuthService: UserAuthApiService) {
    }

    public ngOnInit(): void {
        this._authenticateUser();
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public login(): void {
        if (this.username.valid) {
            this._clientParams.login = this.username.value;

            this._userAuthService.authentication(this._clientParams);
        }
    }

    private _authenticateUser(): void {
        const code = this._route.snapshot.queryParamMap.get('code');

        if (code) {
            this._clientParams.client_secret = environment.clientSecret;
            this._clientParams.code = code;

            this._userAuthService.getToken(this._clientParams)
                .pipe(
                    switchMap((token: TokenModel) => this._userAuthService.getAuthenticatedUser(token.access_token)),
                    takeUntil(this._destroyed$)
                )
                .subscribe({
                        next: (user: UserModel) => {
                            localStorage.setItem('user', JSON.stringify(user));
                            this._router.navigate(['/']);
                        },
                        error: (error) => {
                            console.log(error);
                        },
                        complete: () => {
                        }
                    }
                );
        }
    }
}
