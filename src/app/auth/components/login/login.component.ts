// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { UserModel, TokenModel } from '@core/models';

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

    private _destroy$ = new Subject<void>();

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _userAuthService: UserAuthApiService) {
    }

    public ngOnInit(): void {
        this._authenticateUser();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public login(): void {
        if (this.username.valid) {
            const queryParams = {
                client_id: environment.clientId,
                redirect_uri: environment.redirectUri,
                login: this.username.value
            };
            this._userAuthService.authentication(queryParams);
        }
    }

    private _authenticateUser(): void {
        const code = this._route.snapshot.queryParamMap.get('code');

        if (code) {
            const params = {
                client_id: environment.clientId,
                client_secret: environment.clientSecret,
                code,
                redirect_uri: environment.redirectUri
            };
            this._userAuthService.getToken(params)
                .pipe(
                    switchMap((token: TokenModel) => this._userAuthService.getAuthenticatedUser(token.access_token)),
                    takeUntil(this._destroy$)
                )
                .subscribe({
                        next: (user: UserModel) => {
                            localStorage.setItem('user', JSON.stringify(user));
                            this._router.navigate(['/']);
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    }
                );
        }
    }
}
