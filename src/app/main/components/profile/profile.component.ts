// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// CORE
import { UserModel, UserPublicModel } from '@core/models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: UserPublicModel | UserModel;

  constructor(
    private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._loadUser();
  }

  private _loadUser(): void {
    this._route.data.subscribe(
      (data: any) => {
        this.user = data.user;
      }
    );
  }
}
