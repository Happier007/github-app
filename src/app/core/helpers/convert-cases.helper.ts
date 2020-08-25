// ANGULAR
import { HttpParams, HttpRequest } from '@angular/common/http';

// CORE
import { CAMEL_CASE, SNAKE_CASE } from '@core/utils';

export function snakeToCamel(response: object | any[]): object | null {

  if (!response) {
    return response;
  }

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


export function camelToSnake(request: HttpRequest<any>): HttpRequest<any> | null {

  if (!request) {
    return request;
  }

  const queryParams = (request.method === 'GET') ? camelToSnakeForGET(request.params as HttpParams) : request.params;

  return request.clone({
    params: queryParams as any,
    body: camelToSnakeForPOST(request.body)
  });
}

function camelToSnakeForGET(urlParams: HttpParams): HttpParams | null {

  if (!urlParams) {
    return urlParams;
  }

  let params = new HttpParams();

  const urlParamsKeys = urlParams.keys();

  urlParamsKeys.forEach((key: string) => {
    const modifiedKey = key.replace(SNAKE_CASE, replacement => '_' + replacement[0].toLowerCase());
    params = params.append(modifiedKey, urlParams.get(key));
  });

  return params;
}

function camelToSnakeForPOST(bodyParams: object): object | null {

  if (!bodyParams) {
    return bodyParams;
  }

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
}
  
