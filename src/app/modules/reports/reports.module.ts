import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fhsis2018McComponent } from './report/fhsis2018-mc/fhsis2018-mc.component';
import { Fhsis2018CcComponent } from './report/fhsis2018-cc/fhsis2018-cc.component';
import { NameListComponent } from './modals/name-list/name-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderFhsis2018Component } from './components/header-fhsis2018/header-fhsis2018.component';
import { ExportAsModule } from 'ngx-export-as';
import { PatientRegisteredComponent } from './report/patient-registered/patient-registered.component';
import { CatalystReportComponent } from './report/catalyst-report/catalyst-report.component';
import { Fhsis2018MorbidityComponent } from './report/fhsis2018-morbidity/fhsis2018-morbidity.component';
import { HouseholdProfilingComponent } from './report/household-profiling/household-profiling.component';
import { Fhsis2018TbComponent } from "./report/fhsis2018-tb/fhsis2018-tb.component";
import { DailyServiceComponent } from './report/daily-service/daily-service.component';
import { Fhsis2018NcdComponent } from './report/fhsis2018-ncd/fhsis2018-ncd.component';
import { Fhsis2018FpComponent } from './report/fhsis2018-fp/fhsis2018-fp.component';
import {ShowNameListComponent} from "./modals/show-name-list/show-name-list.component";
import { FeedbackReportComponent } from './report/feedback-report/feedback-report.component';
import { AbReportComponent } from './report/ab-report/ab-report.component';
import { AbPostComponent } from './report/ab-post/ab-post.component';
import { AbPreComponent } from './report/ab-pre/ab-pre.component';
import { Fhsis2018DentalM1Component } from './report/fhsis2018-dental-m1/fhsis2018-dental-m1.component';
import { Fhsis2018MortalityComponent } from './report/fhsis2018-mortality/fhsis2018-mortality.component';
import { Fhsis2018EnvironmentalComponent } from './report/fhsis2018-environmental/fhsis2018-environmental.component';


@NgModule({
  declarations: [
    ReportsComponent,
    Fhsis2018McComponent,
    Fhsis2018CcComponent,
    NameListComponent,
    HeaderFhsis2018Component,
    PatientRegisteredComponent,
    CatalystReportComponent,
    Fhsis2018MorbidityComponent,
    HouseholdProfilingComponent,
    Fhsis2018TbComponent,
    DailyServiceComponent,
    Fhsis2018NcdComponent,
    Fhsis2018FpComponent,
    ShowNameListComponent,
    FeedbackReportComponent,
    AbReportComponent,
    AbPostComponent,
    AbPreComponent,
    Fhsis2018DentalM1Component,
    Fhsis2018MortalityComponent,
    Fhsis2018EnvironmentalComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
    ExportAsModule
  ]
})
export class ReportsModule { }
