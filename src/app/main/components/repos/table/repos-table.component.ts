// ANGULAR
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// CORE
import { PageParamsSinceModel, RepoModel } from '@core/models';

// MAIN
import { ReposTableService } from '../../../services';


@Component({
  selector: 'app-repos-table',
  templateUrl: './repos-table.component.html',
  styleUrls: ['./repos-table.component.scss'],
})
export class ReposTableComponent implements OnInit, OnDestroy {

  public pageParams: PageParamsSinceModel = new PageParamsSinceModel();
  public dataSource = new MatTableDataSource<RepoModel>([]);
  public displayedColumns: string[] = ['name'];

  private _destroyed$ = new Subject<void>();

  constructor(private _reposTableService: ReposTableService) {
  }

  public ngOnInit(): void {
    this._reposTableService.getRepos();

    this._subSearchEvent();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public pageEventRepos(since: number): void {
    this._reposTableService.pageEvent(since);
  }

  public reposSelected(repos: RepoModel[]): void {
    if (!!repos.length) {
      this.dataSource.data = repos;

      this.pageParams = new PageParamsSinceModel();
    } else {
      this._reposTableService.getRepos();
    }
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
}
