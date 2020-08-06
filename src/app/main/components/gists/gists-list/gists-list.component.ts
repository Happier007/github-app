import { Component, OnInit } from '@angular/core';
import { IGist, IProfile, QueryParams } from '@core/interfaces';
import { GitApiService } from '@main/services';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { QueryParamsModel } from '../../../../core/models/queryParams.model';

@Component({
    selector: 'app-gists-list',
    templateUrl: './gists-list.component.html',
    styleUrls: ['./gists-list.component.scss']
})
export class GistsListComponent implements OnInit {

    public profile: IProfile;
    public gists$: Observable<IGist[]>;
    public pageIndexGists: number;

    constructor(private _gitApiService: GitApiService) {
    }

    public ngOnInit(): void {
        this.profile = JSON.parse(localStorage.getItem('user'));
        this.fetchGists(new QueryParamsModel());
    }

    public fetchGists(pageParams): void {
        if (this.profile) {
            this.gists$ = this._gitApiService.getGists(this.profile.url, pageParams);
        }
    }

    public pageEventGists(event: PageEvent): void {

        // this.logInfo = new Log(req.method, req.urlWithParams);
        const pageParams: QueryParamsModel = new QueryParamsModel(event);

        this.fetchGists(pageParams);
    }

    public trackByFn(index: number): number {
        return index;
    }
}
