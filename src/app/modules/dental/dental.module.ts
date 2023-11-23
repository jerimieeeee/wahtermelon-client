import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalRoutingModule } from './dental-routing.module';
import { DentalComponent } from './dental.component';
import { ToothConditionComponent } from './modals/tooth-condition/tooth-condition.component';
import { ToothServicesComponent } from './modals/tooth-services/tooth-services.component';
import { AdultChartComponent } from './components/chart-adult/chart-adult.component';
import { TempChartComponent } from './components/chart-temp/chart-temp.component';
import { HistoryComponent } from './components/history/history.component';
import { ConditionComponent } from './components/condition/condition.component';
import { ServicesComponent } from './components/services/services.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintHistoryComponent } from 'app/shared/shared-components/consultation/complaint-history/complaint-history.component';
import { ConsultHistoryComponent } from 'app/shared/shared-components/consultation/consult-history/consult-history.component';
import { FinalDxComponent } from 'app/shared/shared-components/consultation/final-dx/final-dx.component';
import { GeneralSurveyComponent } from 'app/shared/shared-components/consultation/general-survey/general-survey.component';
import { InitialDxComponent } from 'app/shared/shared-components/consultation/initial-dx/initial-dx.component';
import { ManagementComponent } from 'app/shared/shared-components/consultation/management/management.component';


@NgModule({
  declarations: [
    DentalComponent,
    AdultChartComponent,
    TempChartComponent,
    ToothConditionComponent,
    ToothServicesComponent,
    HistoryComponent,
    ConditionComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    DentalRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ComplaintHistoryComponent,
    ConsultHistoryComponent,
    FinalDxComponent,
    GeneralSurveyComponent,
    InitialDxComponent,
    ManagementComponent
  ]
})
export class DentalModule { }
