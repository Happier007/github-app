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
        loadChildren: './main/main.module#MainModule',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
