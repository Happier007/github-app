// ANGULAR
import { Injectable } from '@angular/core';

// RXJS
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoaderService {

    public isLoading = new BehaviorSubject<boolean>(false);

    public show(): void {
        this.isLoading.next(true);
    }

    public hide(): void {
        this.isLoading.next(false);
    }
}
