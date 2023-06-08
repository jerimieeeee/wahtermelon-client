import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NcdRoutingModule } from './ncd-routing.module';
import { NcdComponent } from './ncd.component';
import { RiskAssessmentComponent } from './components/risk-assessment/risk-assessment.component';
import { RiskStratificationComponent } from './components/risk-stratification/risk-stratification.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { PatientRecordComponent } from './components/patient-record/patient-record.component';
import { CasdtComponent } from './components/casdt/casdt.component';
import { RiskScreeningComponent } from './components/risk-screening/risk-screening.component';
import { Casdt2Component } from './components/casdt2/casdt2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';


@NgModule({
  declarations: [NcdComponent, RiskAssessmentComponent, RiskStratificationComponent, QuestionnaireComponent, PatientRecordComponent, CasdtComponent, RiskScreeningComponent, Casdt2Component],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NcdRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EndVisitComponent
  ]
})
export class NcdModule { }
