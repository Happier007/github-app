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
import { PageParamsSinceModel } from '@core/models';

// MAIN
import { ReposService, SearchReposService } from '../../../services';


@Component({
  selector: 'app-repos-table',
  templateUrl: './repos-table.component.html',
  styleUrls: ['./repos-table.component.scss']
})
export class ReposTableComponent implements OnInit, OnDestroy {

  @ViewChild('table', {static: false}) table: MatTable<Element>;

  public pageParams: PageParamsSinceModel = new PageParamsSinceModel();
  public dataSource = new MatTableDataSource([]);

  public displayedColumns: string[] = ['name'];

  private _destroyed$ = new Subject<void>();

  constructor(
    private _reposService: ReposService,
    private _searchReposService: SearchReposService) {
  }

  public ngOnInit(): void {
    this._reposService.getRepos();

    this._subSearchEvent();

    this._subChipsEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventRepos(since: number): void {
    this._reposService.pageEvent(since);
  }

  private _subSearchEvent(): void {
    this._reposService.reposSearchEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(
      () => {
        this.dataSource.data = this._reposService.repos();
        this.pageParams = this._reposService.getPage();
      }
    );
  }

  private _subChipsEvent(): void {
    this._searchReposService.reposChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {

      const reposChips = this._searchReposService.reposChips;

      if (!!reposChips.length) {
        this.dataSource.data = reposChips;
        this.pageParams = new PageParamsSinceModel();
      } else {
        this._reposService.getRepos();
      }

      this.table.renderRows();
    });
  }
}
