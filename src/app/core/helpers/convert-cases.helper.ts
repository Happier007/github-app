// CORE
import { CAMEL_CASE, SNAKE_CASE } from '@core/utils';

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

export function camelToSnake(request: object | any[]): object | null {

  if (request !== null) {

    const responseKeys = Object.keys(request);

    responseKeys.forEach((key: string) => {

      if (typeof request[key] === 'object') {
        if (Array.isArray(request[key])) {
          request[key].map(k => camelToSnake(k));
        } else {
          camelToSnake(request[key]);
        }
      }

      const modifiedKey = key.replace(SNAKE_CASE, replacement => '_' + replacement[0].toLowerCase());

      if (modifiedKey !== key) {
        request[modifiedKey] = request[key];
        delete request[key];
      }
    });
  }

  return request;
}
