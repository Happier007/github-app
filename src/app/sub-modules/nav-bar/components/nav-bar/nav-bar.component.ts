// ANGULAR
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// CORE
import { UserService } from '@core/services';
import { UserModel } from '@core/models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input() public user: UserModel;

  constructor(
    private _router: Router,
    private _userService: UserService) {
  }

  public logout(): void {
    this._userService.removeAuthenticatedUser();

    this._router.navigate(['/', 'auth']);
  }
}
