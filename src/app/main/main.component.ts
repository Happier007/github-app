// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RXJS
import { BehaviorSubject } from 'rxjs';

// CORE
import { UserModel } from '@core/models';

// CURRENT
import { LoaderService } from './services';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public user: UserModel;
    public isLoading: BehaviorSubject<boolean> = this._loaderService.isLoading;

    constructor(
        private _router: Router,
        private _loaderService: LoaderService) {}

    public ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    public logout(): void {
        localStorage.removeItem('user');
        this._router.navigate(['/', 'auth']);
    }
}
