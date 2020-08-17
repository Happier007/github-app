// ANGULAR
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

// Main
import { LoaderService } from '../../main/services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private _loaderService: LoaderService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        Promise.resolve(null).then(() => this._loaderService.show());

        return next.handle(req)
            .pipe(
                finalize(() => {
                    this._loaderService.hide();
                })
            );
    }
}
