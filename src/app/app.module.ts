// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// APP MODULES
import * as appModules from './';

// CORE
import { ChangeCaseInterseptor } from './core/interceptors/change-case.interseptor';
import { LoaderInterseptor } from './core/interceptors/loader.interseptor';

// CURRENT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        appModules.AuthModule,
        appModules.CoreModule,
        appModules.MaterialModule,
        appModules.SharedModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ChangeCaseInterseptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterseptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
