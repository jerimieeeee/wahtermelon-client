import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NcdRoutingModule } from './ncd-routing.module';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { NcdComponent } from './ncd.component';
import { RiskAssessmentComponent } from './components/risk-assessment/risk-assessment.component';
import { RiskStratificationComponent } from './components/risk-stratification/risk-stratification.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { PatientRecordComponent } from './components/patient-record/patient-record.component';
import { CasdtComponent } from './components/casdt/casdt.component';


@NgModule({
  declarations: [NcdComponent, RiskAssessmentComponent, RiskStratificationComponent, QuestionnaireComponent, PatientRecordComponent, CasdtComponent],
  imports: [
    CommonModule,FontAwesomeModule,
    NcdRoutingModule,SharedComponentsModule
  ]
})
export class NcdModule { }
