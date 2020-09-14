// ANGULAR
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// RXJS
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

// CORE
import { PageParamsModel, RepoModel, UserPublicModel } from '@core/models';

// MAIN
import { SearchUsersService } from '../../../services';

// LODASH
import isEqual from 'lodash/isEqual';
import { CustomValidators } from '../../../../core/validators';
import { ReposApiService, UsersApiService } from '@core/services';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchUsersComponent implements OnInit, OnDestroy {

  @Output() public usersSelectedEvent = new EventEmitter<UserPublicModel[]>();

  public userNameCtrl = new FormControl('', [CustomValidators.objectType]);
  public usersSelected: UserPublicModel[] = [];
  public usersList$: Observable<UserPublicModel[]> = new Observable<UserPublicModel[]>();

  @ViewChild('userNameInput', {static: false}) private _userNameInput: ElementRef<HTMLInputElement>;
  private _destroyed$ = new Subject<void>();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _usersApiService: UsersApiService) {
  }

  public ngOnInit(): void {

    this._subRepoNameCtrlChanged();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public selectUsers(): void {
    if (this.userNameCtrl.valid) {
      this.usersSelectedEvent.emit(this.usersSelected);
    }
  }

  public removeUser(user: UserPublicModel): void {
    this.usersSelected = this.usersSelected.filter((item: UserPublicModel) => item !== user);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _subRepoNameCtrlChanged(): void {
    this.userNameCtrl.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(isEqual),
      takeUntil(this._destroyed$),
    ).subscribe((user: any) => {

      if (user instanceof UserPublicModel) {
        this.usersSelected.push(user);
        this._cdRef.detectChanges();

        this._userNameInput.nativeElement.value = '';

        this.usersList$ = new Observable<UserPublicModel[]>();
      } else if (user) {
        this.usersList$ = this._fetchUsersByName(user);
      }

    });
  }

  private _fetchUsersByName(name: string): Observable<UserPublicModel[]> {
    const queryParams = new PageParamsModel();
    queryParams.q = name;

    return this._usersApiService.searchUsersByName(queryParams);
  }
}
