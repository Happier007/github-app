// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// CORE
import { ProfileModel } from '@core/models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public user: ProfileModel;

    constructor(private _router: Router) {
    }

    public ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    public logout(): void {
        localStorage.removeItem('user');
        this._router.navigate(['/', 'auth']);
    }
}
