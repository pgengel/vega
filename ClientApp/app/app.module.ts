import { AuthService } from './auth/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';
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
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicle/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
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
        VehicleService, PhotoService, ProgressService, AuthService
    ]
})
export class AppModule {
}
