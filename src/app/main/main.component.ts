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

    public profile: ProfileModel;

    constructor(private _router: Router) {
    }

    public ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    public logout(): void {
        localStorage.removeItem('profile');
        this._router.navigate(['/', 'auth']);
    }
}
