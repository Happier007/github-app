// ANGULAR
import { Injectable } from '@angular/core';

// ENVIRONMENT
import { environment } from '@environments/environment';

@Injectable()
export class BaseApiService {

  protected _url: string = environment.gitUrl;
  protected _gitApiUrl: string = environment.gitApiUrl;

  constructor() {
    this._url = environment.gitUrl;
    this._gitApiUrl = environment.gitApiUrl;
  }
}
