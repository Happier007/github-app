// ANGULAR
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';

// CORE
import { UserService } from '@core/services';
import { UserModel } from '@core/models';

// CURRENT
import { LoaderService } from '@shared/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public user$: Subject<UserModel> = this._userService.authorizedUser$;
  public isLoading$: Subject<boolean> = this._loaderService.isLoading;

  constructor(
    private _router: Router,
    private _loaderService: LoaderService,
    private _userService: UserService) {
  }

  public logout(): void {
    localStorage.removeItem('access-token');

    this._userService.removeAuthenticatedUser();

    this._router.navigate(['/', 'auth']);
  }
}
