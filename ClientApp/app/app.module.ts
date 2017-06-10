import {AuthConfig} from 'angular2-jwt/angular2-jwt';
import { PingComponent } from './ping/ping.component';
import { AuthHttp } from 'angular2-jwt';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import {RequestOptions, BrowserXhr,  Http} from '@angular/http';
import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-form/vehicle-list.component';
import * as Raven from 'raven-js';  
import { FormsModule } from '@angular/forms'
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { ToastyModule} from 'ng2-toasty';

import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';

import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AppErrorHandler } from "./app.error-handler";
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

Raven
  .config('https://10ece1abb4fb4786a9291fca42b86e74@sentry.io/167850')
  .install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        VehicleViewComponent,
        ProfileComponent,
        PingComponent,
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicle/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'ping', component: PingComponent },
            { path: 'vehicle/:id', component: VehicleViewComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },  { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        VehicleService, PhotoService, ProgressService, 
        AuthService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
    ]
})
export class AppModule {
}
