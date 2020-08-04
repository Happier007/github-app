// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CURRENT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// APP MODULES
import * as appModules from './';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        appModules.AuthModule,
        appModules.CoreModule,
        appModules.MainModule,
        appModules.MaterialModule,
        appModules.SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
