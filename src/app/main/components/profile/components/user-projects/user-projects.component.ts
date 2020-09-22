// ANGULAR
import { Component, Input, OnInit } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { ProjectModel, UserModel } from '@core/models';
import { ProjectsApiService } from '@core/services';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

  @Input() user: UserModel;

  public projects$: Observable<ProjectModel[]>;

  constructor(private _projectsApiService: ProjectsApiService) {
  }

  public ngOnInit(): void {
    this.fetchProjects();
  }
  
  private fetchProjects(): void {
    this.projects$ = this._projectsApiService.getUserProjects(this.user.login);
  }
}
