// ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// RXJS
import { Observable } from 'rxjs';

// CORE
import { PageParamsModel, ProjectModel, UserModel } from '@core/models';
import { ProjectsApiService } from '@core/services';
import { PAGE_SIZE_OPTIONS } from '@core/utils';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

  @Input() user: UserModel;

  public pageParams: PageParamsModel = new PageParamsModel();
  public pageSizeOption = PAGE_SIZE_OPTIONS;
  public projects$: Observable<ProjectModel[]>;

  constructor(private _projectsApiService: ProjectsApiService) {
  }

  public ngOnInit(): void {
    this.fetchProjects();
  }

  public pageEvent(event: PageEvent): void {
    this.pageParams = new PageParamsModel(event);

    this.fetchProjects();
  }

  private fetchProjects(): void {
    this.projects$ = this._projectsApiService.getUserProjects(this.user.login, this.pageParams);
  }
}
