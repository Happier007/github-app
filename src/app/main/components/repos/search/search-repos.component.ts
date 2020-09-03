// ANGULAR
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// RXJS
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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

  @ViewChild('repoNameInput', {static: false}) repoNameInput: ElementRef<HTMLInputElement>;

  public repoName = new FormControl('', Validators.required);

  public reposChips: RepoModel[] = [];
  public reposList$: Observable<RepoModel[]> = new Observable<RepoModel[]>();

  private _destroyed$ = new Subject<void>();

  constructor(private _searchReposService: SearchReposService) {
  }

  ngOnInit() {
    this._subSearchEvent();

    this.repoName.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(isEqual),
      takeUntil(this._destroyed$),
    ).subscribe(() => {

      this.reposList$ = this._searchReposService.fetchReposByName(this.repoName.value);
    });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public addChips(event: MatAutocompleteSelectedEvent): void {
    this._searchReposService.addRepoToChips(event.option.value);

    this.repoNameInput.nativeElement.value = '';
  }

  public removeChips(repo: RepoModel): void {
    this._searchReposService.removeRepoFromChips(repo);
  }

  private _subSearchEvent(): void {
    this._searchReposService.reposChipsEvent
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(() => {
      this.reposChips = this._searchReposService.reposChips;
    });
  }
}
