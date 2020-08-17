// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGist } from '../../../../core/interfaces/gist.interface';
import { GitApiService } from '@core/services';
import { QueryParamsModel } from '../../../../core/models/queryParams.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-gists-list',
    templateUrl: './gists-list.component.html',
    styleUrls: ['./gists-list.component.scss']
})
export class GistsListComponent implements OnInit {

    public gists$: Observable<IGist[]>;
    public pageIndexGists: number;

    constructor(private _gitApiService: GitApiService) {
    }

    public ngOnInit(): void {
        this.fetchGists(new QueryParamsModel());
    }

    public fetchGists(pageParams): void {
        this.gists$ = this._gitApiService.getGists(pageParams);
    }

    public pageEventGists(event: PageEvent): void {

        debugger
        const pageParams: QueryParamsModel = new QueryParamsModel(event);

        this.fetchGists(pageParams);
    }

    public trackByFn(index: number): number {
        return index;
    }
}
