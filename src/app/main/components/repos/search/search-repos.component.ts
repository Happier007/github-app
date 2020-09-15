// ANGULAR
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';

// RXJS
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';

// CORE
import { PageParamsModel, RepoModel } from '@core/models';
import { ReposApiService } from '@core/services';
import { CustomValidators } from '@core/validators';


@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchReposComponent implements OnInit, OnDestroy {

  @Output() public reposSelectedEvent = new EventEmitter<RepoModel[]>();

  public repoNameCtrl = new FormControl('', [CustomValidators.objectType]);
  public reposSelected: RepoModel[] = [];
  public reposList$: Observable<RepoModel[]> = new Observable<RepoModel[]>();

  @ViewChild('repoNameInput', {static: false}) private _repoNameInput: ElementRef<HTMLInputElement>
  private _destroyed$ = new Subject<void>();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _reposApiService: ReposApiService) {
  }

  public ngOnInit(): void {
    this._subRepoNameCtrlChanged();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public selectRepos(): void {
    if (this.repoNameCtrl.valid) {
      this.reposSelectedEvent.emit(this.reposSelected);
    }
  }

  public removeRepo(repo: RepoModel): void {
    this.reposSelected = this.reposSelected.filter((item: RepoModel) => item !== repo);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _subRepoNameCtrlChanged(): void {
    this.repoNameCtrl.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this._destroyed$),
    ).subscribe((repo: any) => {

      if (repo instanceof RepoModel) {
        this.reposSelected.push(repo);
        this._cdRef.detectChanges();

        this._repoNameInput.nativeElement.value = '';

        this.reposList$ = new Observable<RepoModel[]>();
      } else if (repo) {
        this.reposList$ = this._fetchReposByName(repo);
      }
    });
  }

  private _fetchReposByName(name: string): Observable<RepoModel[]> {
    const queryParams = new PageParamsModel();
    queryParams.q = name;

    return this._reposApiService.searchReposByName(queryParams);
  }
}
