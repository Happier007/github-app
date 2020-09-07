// ANGULAR
import { EventEmitter, Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { PageParamsModel, RepoModel } from '@core/models';
import { ReposApiService } from '@core/services';


@Injectable()
export class SearchReposService {

  public reposChipsEvent = new EventEmitter<void>();

  private _reposChipsList: RepoModel[] = [];

  constructor(private _reposApiService: ReposApiService) {
  }

  public get reposSelected() {
    return this._reposChipsList;
  }

  public selectRepo(repo: RepoModel): void {
    this._reposChipsList.push(repo);

    this.reposChipsEvent.emit();
  }

  public removeSelectedRepo(repo: RepoModel): void {
    this._reposChipsList = this._reposChipsList.filter((item: RepoModel) => item !== repo);

    this.reposChipsEvent.emit();
  }

  public fetchReposByName(name: string): Observable<RepoModel[]> {
    const queryParams = new PageParamsModel();
    queryParams.q = name;

    return this._reposApiService.searchReposByName(queryParams);
  }
}
