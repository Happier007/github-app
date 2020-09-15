// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// СORE
import { PageParamsSinceModel, UserPublicModel } from '@core/models';

// CURRENT
import { UsersTableService } from '../../../services';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  public pageParams: PageParamsSinceModel = new PageParamsSinceModel();
  public dataSource = new MatTableDataSource<UserPublicModel>([]);
  public displayedColumns: string[] = ['login'];

  private _destroyed$ = new Subject<void>();

  constructor(
    private _usersTableService: UsersTableService) {
  }

  public ngOnInit(): void {
    this._usersTableService.getUsers();

    this._subSearchEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventUsers(since: number): void {
    this._usersTableService.pageEvent(since);
  }

  public usersSelected(users: UserPublicModel[]): void {

    if (!!users.length) {
      this.dataSource.data = users;

      this.pageParams = new PageParamsSinceModel();
    } else {
      this._usersTableService.getUsers();
    }
  }

  private _subSearchEvent(): void {
    this._usersTableService.usersSearchEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(
      () => {
        this.dataSource.data = this._usersTableService.users;
        this.pageParams = this._usersTableService.getPage;
      }
    );
  }
}
