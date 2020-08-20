// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { GitApiService } from '@core/services';
import { GistModel } from '@core/models';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.scss']
})
export class GistDetailComponent implements OnInit {

  public gist$ = new Observable<GistModel>();

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _gitApiService: GitApiService) {
  }

  public ngOnInit(): void {
    this.fetchGist();
  }

  public goBack(): void {
    this._location.back();
  }

  public trackByFn(index: number): number {
    return index;
  }

  private fetchGist(): void {
    const idGist = this._route.snapshot.paramMap.get('id');
    if (idGist) {
      this.gist$ = this._gitApiService.gistById(idGist);
    }
  }
}
