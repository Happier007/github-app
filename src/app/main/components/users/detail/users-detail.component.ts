// ANGULAR
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { UsersApiService } from '@core/services';
import { UserPublicModel } from '@core/models';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  public user$ = new Observable<UserPublicModel>();

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _usersApiService: UsersApiService) {
  }

  public ngOnInit(): void {
    this.fetchRepoByName();
  }

  public goBack(): void {
    this._location.back();
  }

  private fetchRepoByName(): void {
    const userName = this._route.snapshot.paramMap.get('username');

    if (userName) {
      this.user$ = this._usersApiService.getUser(userName);
    }
  }
}
