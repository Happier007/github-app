// ANGULAR
import { EventEmitter, Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { PageParamsModel, UserPublicModel } from '@core/models';
import { UsersApiService } from '@core/services';


@Injectable()
export class SearchUsersService {

  public usersChipsEvent = new EventEmitter<void>();

  private _usersChipsList: UserPublicModel[] = [];

  constructor(private _usersApiService: UsersApiService) {
  }

  public get usersChips() {
    return this._usersChipsList;
  }

  public addUserToChips(user: UserPublicModel): void {
    this._usersChipsList.push(user);

    this.usersChipsEvent.emit();
  }

  public removeUserFromChips(user: UserPublicModel): void {
    this._usersChipsList = this._usersChipsList.filter((item: UserPublicModel) => item !== user);

    this.usersChipsEvent.emit();
  }

  public fetchUserByName(name: string): Observable<UserPublicModel[]> {
    const queryParams = new PageParamsModel();
    queryParams.q = name;

    return this._usersApiService.usersByName(queryParams);
  }
}
