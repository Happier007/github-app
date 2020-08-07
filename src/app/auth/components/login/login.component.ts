// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { ProfileModel, TokenModel } from '@core/models';

// AUTH
import { UserAuthApiService } from '../../services';

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
        if (!this.username.invalid) {
            this._userAuthService.authentication(this.username.value);
        }
    }

    private _authenticateUser(): void {
        const code = this._route.snapshot.queryParamMap.get('code');

        if (code) {
            this._userAuthService.getToken(code)
                .pipe(
                    switchMap((resToken: TokenModel) => this._userAuthService.getAuthenticatedUser(resToken.access_token)),
                    takeUntil(this._destroy$)
                )
                .subscribe(
                    (resUser: ProfileModel) => {
                        localStorage.setItem('user', JSON.stringify(resUser));
                        this._router.navigate(['/']);
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    }
}
