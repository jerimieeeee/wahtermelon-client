import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VitalsGraphComponent } from './components/vitals-graph/vitals-graph.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RequestsInterceptor } from './shared/interceptor/http/http-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RapidOnsiteComponent } from './shared/shared-components/monitoring/rapid-onsite/rapid-onsite.component';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        SidenavComponent,
        VitalsGraphComponent,
        VitalsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FontAwesomeModule,
        NgSelectModule,
        FormsModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        RapidOnsiteComponent], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestsInterceptor,
            multi: true
        },
        CookieService,
        provideEnvironmentNgxMask(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
