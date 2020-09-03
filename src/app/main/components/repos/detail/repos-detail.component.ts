import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GistModel, RepoModel } from '@core/models';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GistsApiService, ReposApiService } from '@core/services';

@Component({
  selector: 'app-repos-detail',
  templateUrl: './repos-detail.component.html',
  styleUrls: ['./repos-detail.component.scss']
})
export class ReposDetailComponent implements OnInit {

  public repos$ = new Observable<RepoModel>();

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _reposApiService: ReposApiService) {
  }

  public ngOnInit(): void {
    this.fetchRepoByName();
  }

  public goBack(): void {
    this._location.back();
  }

  public trackByFn(index: number): number {
    return index;
  }

  private fetchRepoByName(): void {
    const userName = this._route.snapshot.paramMap.get('username');
    const repoName = this._route.snapshot.paramMap.get('reponame');
    if (userName && repoName) {
      this.repos$ = this._reposApiService.publicRepoByName(userName, repoName);
    }
  }
}
