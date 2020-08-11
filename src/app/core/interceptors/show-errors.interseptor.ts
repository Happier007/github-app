// ANGULAR
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// CORE
import { NotificationService } from '@core/services';


@Injectable()
export class ShowErrorsInterseptor implements HttpInterceptor {

    constructor(
        private _notificationService: NotificationService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this._notificationService.showError(error.message);
                    return throwError(error);
                })
            );
    }
}
