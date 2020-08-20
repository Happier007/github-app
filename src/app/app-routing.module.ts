// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

// AUTH
import { LoginComponent } from './auth/components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './main/main.module#MainModule'
      },
    ]
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {
}
