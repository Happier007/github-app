// ANGULAR
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// СORE
import { PageParamsSinceModel } from '@core/models';
import { UsersListService, SearchUsersService } from '../../../services';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  @ViewChild('table', {static: false}) table: MatTable<Element>;

  public pageParams: PageParamsSinceModel = new PageParamsSinceModel();
  public dataSource = new MatTableDataSource([]);

  public displayedColumns: string[] = ['login'];

  private _destroyed$ = new Subject<void>();

  constructor(
    private _usersListService: UsersListService,
    private _searchUsersService: SearchUsersService) {
  }

  public ngOnInit(): void {
    this._usersListService.getUsers();

    this._subSearchEvent();

    this._subChipsEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventUsers(since: number): void {
    this._usersListService.pageEvent(since);
  }

  private _subSearchEvent(): void {
    this._usersListService.usersSearchEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(
      () => {
        this.dataSource.data = this._usersListService.users();
        this.pageParams = this._usersListService.getPage();
      }
    );
  }

  private _subChipsEvent(): void {
    this._searchUsersService.usersChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {

      const usersChips = this._searchUsersService.usersChips;

      if (!!usersChips.length) {
        this.dataSource.data = usersChips;
        this.pageParams = new PageParamsSinceModel();
      } else {
        this._usersListService.getUsers();
      }

      this.table.renderRows();
    });
  }
}
