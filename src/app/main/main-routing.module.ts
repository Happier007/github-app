// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

// CURRENT
import { MainComponent } from './main.component';
import {
  GistDetailComponent,
  GistsTableComponent,
  ProfileComponent,
  ReposDetailComponent,
  ReposTableComponent,
  UsersTableComponent,
  UsersDetailComponent
} from './components';

const routes: Routes = [
  {
    path: '', component: MainComponent,

    children: [
      {
        path: 'repos',
        component: ReposTableComponent
      },
      {
        path: 'repos/:username/:reponame',
        component: ReposDetailComponent
      },
      {
        path: 'users',
        component: UsersTableComponent
      },
      {
        path: 'users/:username',
        component: UsersDetailComponent
      },
      {
        path: 'gists',
        component: GistsTableComponent
      },
      {
        path: 'gist/:id',
        component: GistDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
