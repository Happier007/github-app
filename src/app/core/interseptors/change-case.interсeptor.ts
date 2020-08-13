// ANGULAR
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelToSnake, snakeToCamel } from '../helpers/convert-cases.helper';


@Injectable()
export class ChangeCaseInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const snakeCaseBody = camelToSnake(req.body);

        const modifyRequest = req.clone({
            body: snakeCaseBody
        });

        return next.handle(modifyRequest)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {

                        const camelCaseBody = snakeToCamel(event.body);

                        const modifyResponse = event.clone({
                            body: camelCaseBody
                        });

                        return modifyResponse;
                    }
                })
            );
    }
}
