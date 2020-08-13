// ANGULAR
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChangeCaseInterseptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const snakeCaseBody = this._changeKeys(req.body, false);
        const modifyRequest = req.clone({
            body: snakeCaseBody
        });

        return next.handle(modifyRequest)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const camelCaseBody = this._changeKeys(event.body, true);
                        const modifyResponse = event.clone({
                            body: camelCaseBody
                        });
                        return modifyResponse;
                    }
                })
            );
    }

    private _changeKeys(obj, isResponse): object {
        for (let key in obj) {

            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    obj[key].map(v => this._changeKeys(v, isResponse));
                } else {
                    this._changeKeys(obj[key], isResponse);
                }
            }

            let modifiedKey = '';

            if (isResponse) {
                modifiedKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
            } else {
                modifiedKey = key.replace(/([A-Z])/g, g => '_' + g[0].toLowerCase());
            }

            if (modifiedKey !== key) {
                obj[modifiedKey] = obj[key];
                delete obj[key];
            }
        }
        return obj;
    }
}
