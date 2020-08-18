// ANGULAR
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// CORE
import { NotificationService } from '@core/services';
import { MESSAGE_TYPE } from '@core/utils';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private _notificationService: NotificationService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMessage = '';
        switch (error.status) {
          case 400: {
            errorMessage = 'Bad Request';
            break;
          }
          case 401: {
            errorMessage = 'Unauthorized';
            break;
          }
          case 404: {
            errorMessage = 'Not Found';
            break;
          }
          case 500: {
            errorMessage = 'Internal Server Error';
            break;
          }
          case 501: {
            errorMessage = 'Not Implemented';
            break;
          }
          case 502: {
            errorMessage = 'Bad Gateway';
            break;
          }
          case 503: {
            errorMessage = 'Service Unavailable';
            break;
          }
          default: {
            errorMessage = 'Unknown error';
            break;
          }
        }
        this._notificationService.showMessage(errorMessage, MESSAGE_TYPE.error);
        return throwError(error);
      })
    );
  }
}
