// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORE
import { ProjectModel } from '@core/models';
import { BaseApiService } from './base-api.service';


@Injectable()
export class ProjectsApiService extends BaseApiService {

  constructor(private _http: HttpClient) {
    super();
  }

  public getUserProjects(username: string): Observable<ProjectModel[]> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json',
    };

    return this._http.get<ProjectModel[]>(`${this._apiUrl}/users/${username}/projects`,
      {
        headers,
      })
    .pipe(
      map((projects: ProjectModel[]) => projects && projects.map((project: ProjectModel) => new ProjectModel(project)))
    );
  }
}
