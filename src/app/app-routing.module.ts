// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

const routes: Routes = [
    {
        path: '',
        loadChildren: './main/main.module#MainModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
