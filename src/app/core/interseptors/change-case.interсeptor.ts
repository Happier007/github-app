// ANGULAR
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { camelToSnake, snakeToCamel } from '@core/helpers';


@Injectable()
export class ChangeCaseInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        debugger

        const modifyRequest = camelToSnake(req);

        return next.handle(modifyRequest)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {

                        const camelCaseResponse = snakeToCamel(event.body);

                        return event.clone({
                            body: camelCaseResponse
                        });
                    }
                })
            );
    }
}
