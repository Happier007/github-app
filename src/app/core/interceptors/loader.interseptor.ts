// ANGULAR
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

// SHARED
import { LoaderService } from '@shared/services';

@Injectable()
export class LoaderInterseptor implements HttpInterceptor {

    private _requestCounter = 0;

    constructor(private _loaderService: LoaderService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._loaderService.show();
        this._requestCounter++;

        return next.handle(req)
            .pipe(
                finalize(() => {
                    this._requestCounter--;

                    if (!this._requestCounter) {
                        this._loaderService.hide();
                    }
                })
            );
    }
}
