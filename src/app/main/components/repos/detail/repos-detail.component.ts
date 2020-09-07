// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { RepoModel } from '@core/models';
import { ReposApiService } from '@core/services';


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
    this._fetchRepoByName();
  }

  public goBack(): void {
    this._location.back();
  }

  private _fetchRepoByName(): void {
    const userName = this._route.snapshot.paramMap.get('username');
    const repoName = this._route.snapshot.paramMap.get('reponame');

    if (userName && repoName) {
      this.repos$ = this._reposApiService.publicRepoByName(userName, repoName);
    }
  }
}
