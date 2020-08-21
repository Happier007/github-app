// ANGULAR
import { Injectable } from '@angular/core';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class BaseApiService {

  protected _apiUrl: string;

  constructor() {
    this._apiUrl = environment.apiUrl;
  }
}
