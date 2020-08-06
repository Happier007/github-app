// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// RXJS
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

// CORE
import { IProfile, IToken } from '@core/interfaces';

// AUTH
import { UserAuthService } from '../../services';

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
                private _userAuthService: UserAuthService) {
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
            let token;
            this._userAuthService.getToken(code)
                .pipe(
                    tap((resToken: IToken) => token = resToken.access_token),
                    switchMap((resToken: IToken) => this._userAuthService.getAuthenticatedUser(resToken.access_token)),
                    takeUntil(this._destroy$)
                )
                .subscribe(
                    (resUser: IProfile) => {
                        localStorage.setItem('user', JSON.stringify(resUser));
                        // this._router.navigate(['/search']);
                        this._router.navigate(['/']);
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    }
}
