// ANGULAR
import { Injectable } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoaderService {

  private _isLoading$ = new Subject<boolean>();

  public get isLoading(): Subject<boolean>{
    return this._isLoading$;
  }

  public show(): void {
    this.isLoading.next(true);
  }

  public hide(): void {
    this.isLoading.next(false);
  }
}
