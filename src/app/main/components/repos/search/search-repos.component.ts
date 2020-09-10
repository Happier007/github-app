// ANGULAR
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// RXJS
import { Observable, Subject } from 'rxjs';
import { isObject } from 'rxjs/internal-compatibility';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

// CORE
import { RepoModel } from '@core/models';

// CURRENT
import { SearchReposService } from '../../../services';


@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchReposComponent implements OnInit, OnDestroy {

  @ViewChild('repoNameInput', {static: false}) public repoNameInput: ElementRef<HTMLInputElement>;

  public repoNameCtrl = new FormControl('', [Validators.required]);

  public reposSelected: RepoModel[] = [];
  public reposList$: Observable<RepoModel[]> = new Observable<RepoModel[]>();

  private _destroyed$ = new Subject<void>();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _searchReposService: SearchReposService) {
  }

  public ngOnInit(): void {
    this._subSearchEvent();

    this._subRepoNameCtrlChanged();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public selectRepos(): void {
    this._searchReposService.updateSelectedRepos(this.reposSelected);
  }

  public removeRepo(repo: RepoModel): void {
    this.reposSelected = this.reposSelected.filter((item: RepoModel) => item !== repo);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _subSearchEvent(): void {
    this._searchReposService.reposChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {
      this.reposSelected = this._searchReposService.reposSelected;
    });
  }

  private _subRepoNameCtrlChanged(): void {
    this.repoNameCtrl.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this._destroyed$),
    ).subscribe((repo: any) => {

      if (isObject(repo)) {

        this.reposSelected.push(repo);
        this._cdRef.detectChanges();

        this.repoNameInput.nativeElement.value = '';
        this.reposList$ = new Observable<RepoModel[]>();
      } else if (repo) {
        this.reposList$ = this._searchReposService.fetchReposByName(repo);
      }
    });
  }
}
