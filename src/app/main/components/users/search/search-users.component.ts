// ANGULAR
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// RXJS
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

// CORE
import { UserPublicModel } from '@core/models';

// MAIN
import { SearchUsersService } from '../../../services';

// LODASH
import isEqual from 'lodash/isEqual';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, OnDestroy {

  @ViewChild('userNameInput', {static: false}) userNameInput: ElementRef<HTMLInputElement>;

  public userName = new FormControl('', Validators.required);

  public usersChips: UserPublicModel[] = [];
  public usersList$: Observable<UserPublicModel[]> = new Observable<UserPublicModel[]>();

  private _destroyed$ = new Subject<void>();

  constructor(private _searchUsersService: SearchUsersService) {
  }

  public ngOnInit(): void {
    this._subSearchEvent();

    this.userName.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(isEqual),
      takeUntil(this._destroyed$),
    ).subscribe(() => {

      this.usersList$ = this._searchUsersService.fetchUserByName(this.userName.value);
    });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public addChips(event: MatAutocompleteSelectedEvent): void {
    this._searchUsersService.addUserToChips(event.option.value);

    this.userNameInput.nativeElement.value = '';
  }

  public removeChips(user: UserPublicModel): void {
    this._searchUsersService.removeUserFromChips(user);
  }

  private _subSearchEvent(): void {
    this._searchUsersService.usersChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {
      this.usersChips = this._searchUsersService.usersChips;
    });
  }
}
