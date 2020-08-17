// CORE
import { CAMEL_CASE, SNAKE_CASE } from '@core/utils';
import { HttpParams, HttpRequest } from '@angular/common/http';

export function snakeToCamel(response: object | any[]): object | null {

    if (response !== null) {

        const responseKeys = Object.keys(response);

        responseKeys.forEach((key: string) => {

            if (typeof response[key] === 'object') {
                if (Array.isArray(response[key])) {
                    response[key].map(k => snakeToCamel(k));
                } else {
                    snakeToCamel(response[key]);
                }
            }

            const modifiedKey = key.replace(CAMEL_CASE, replacement => replacement[1].toUpperCase());

            if (modifiedKey !== key) {
                response[modifiedKey] = response[key];
                delete response[key];
            }
        });
    }

    return response;
}

export function camelToSnake(request: HttpRequest<any>): HttpRequest<any> | null {

    if (request !== null) {

        let modifyRequest = request;

        switch (request.method) {
            case 'POST': {

                modifyRequest = request.clone({
                    body: camelToSnakeForPOST(request.body)
                });

                break;
            }

            case 'GET': {

                modifyRequest = request.clone({
                    params: camelToSnakeForGET(request.params)
                });

                break;
            }
        }
        return modifyRequest;
    }

    return request;
}


function camelToSnakeForGET(urlParams: HttpParams): HttpParams | null {

    if (urlParams !== null) {

        let params = new HttpParams();

        const urlParamsKeys = urlParams.keys();

        urlParamsKeys.forEach((key: string) => {
            const modifiedKey = key.replace(SNAKE_CASE, replacement => '_' + replacement[0].toLowerCase());
            params = params.append(modifiedKey, urlParams.get(key));
        });

        return params;

    }

    return urlParams;
}

function camelToSnakeForPOST(bodyParams: object): object | null {

    const bodyParamsKeys = Object.keys(bodyParams);

    bodyParamsKeys.forEach((key: string) => {

        if (typeof bodyParams[key] === 'object') {
            if (Array.isArray(bodyParams[key])) {
                bodyParams[key].map(k => camelToSnakeForPOST(k));
            } else {
                camelToSnakeForPOST(bodyParams[key]);
            }
        }

        const modifiedKey = key.replace(SNAKE_CASE, replacement => '_' + replacement[0].toLowerCase());

        if (modifiedKey !== key) {
            bodyParams[modifiedKey] = bodyParams[key];
            delete bodyParams[key];
        }
    });

    return bodyParams;
}
