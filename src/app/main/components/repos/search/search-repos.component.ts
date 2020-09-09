// ANGULAR
import {
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

import {
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';

// CORE
import { RepoModel } from '@core/models';

// CURRENT
import { SearchReposService } from '../../../services';

// lodash
import isEqual from 'lodash/isEqual';


@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.scss']
})
export class SearchReposComponent implements OnInit, OnDestroy {

  @ViewChild('repoNameInput', {static: false}) public repoNameInput: ElementRef<HTMLInputElement>;

  public repoNameCtrl = new FormControl('', Validators.required);

  public reposChips: RepoModel[] = [];
  public reposList$: Observable<RepoModel[]> = new Observable<RepoModel[]>();

  private _destroyed$ = new Subject<void>();

  constructor(private _searchReposService: SearchReposService) {
  }

  public ngOnInit(): void {
    this._subSearchEvent();

    this._subRepoNameCtrlChanged();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public removeRepo(repo: RepoModel): void {
    this._searchReposService.removeSelectedRepo(repo);
  }

  private _subSearchEvent(): void {
    this._searchReposService.reposChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {
      this.reposChips = this._searchReposService.reposSelected;
    });
  }

  private _subRepoNameCtrlChanged(): void {
    this.repoNameCtrl.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(isEqual),
      takeUntil(this._destroyed$),
    ).subscribe((repo: any) => {

      if (isObject(repo)) {
        this._searchReposService.selectRepo(repo);

        this.repoNameInput.nativeElement.value = '';
      } else if (repo) {
        this.reposList$ = this._searchReposService.fetchReposByName(repo);
      }
    });
  }
}
