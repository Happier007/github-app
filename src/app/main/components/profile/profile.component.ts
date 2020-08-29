// ANGULAR
import { Component, OnInit } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { UserService, ProjectsApiService } from '@core/services';
import { UserModel } from '@core/models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<UserModel>;

  constructor(
    private _userService: UserService,
    private _projectsApiService: ProjectsApiService) {
  }

  public ngOnInit(): void {
    this._loadUser();
  }

  private _loadUser(): void {
    this.user$ = this._userService.authorizedUser;
  }
}
