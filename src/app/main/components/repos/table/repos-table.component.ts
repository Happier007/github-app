// ANGULAR
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { COUNT_REPOS } from '@core/utils';
import { PageParamsSinceModel, RepoModel } from '@core/models';

// MAIN
import { ReposTableService, SearchReposService } from '../../../services';


@Component({
  selector: 'app-repos-table',
  templateUrl: './repos-table.component.html',
  styleUrls: ['./repos-table.component.scss'],
})
export class ReposTableComponent implements OnInit, OnDestroy {

  public pageParams: PageParamsSinceModel = new PageParamsSinceModel();
  public dataSource =  new MatTableDataSource<RepoModel>([]);

  public displayedColumns: string[] = ['name'];

  private _destroyed$ = new Subject<void>();

  constructor(
    private _reposTableService: ReposTableService,
    private _searchReposService: SearchReposService) {
  }

  public ngOnInit(): void {
    this._reposTableService.getRepos();

    this._subSearchEvent();

    this._subChipsEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventRepos(since: number): void {
    this._reposTableService.pageEvent(since);
  }

  private _subSearchEvent(): void {
    this._reposTableService.reposSearchEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(
      () => {
        this.dataSource.data = this._reposTableService.repos;
        this.pageParams = this._reposTableService.getPage;
      }
    );
  }

  private _subChipsEvent(): void {
    this._searchReposService.reposChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {

      const reposChips = this._searchReposService.reposSelected;

      if (!!reposChips.length) {
        this.dataSource.data = reposChips;
        this.pageParams = new PageParamsSinceModel();
      } else {
        this._reposTableService.getRepos();
      }
    });
  }
}
