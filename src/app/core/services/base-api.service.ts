// ANGULAR
import { Injectable } from '@angular/core';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class BaseApiService {

  protected _authUrl: string;
  protected _apiUrl: string;

  constructor() {
    this._authUrl = environment.authUrl;
    this._apiUrl = environment.apiUrl;
  }
}
