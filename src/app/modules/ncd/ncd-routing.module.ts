import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NcdComponent } from './ncd.component';
import { RiskStratificationComponent } from './components/risk-stratification/risk-stratification.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { RiskAssessmentComponent } from './components/risk-assessment/risk-assessment.component';
import { PatientRecordComponent } from './components/patient-record/patient-record.component';
import { CasdtComponent } from './components/casdt/casdt.component';

const routes: Routes = [{ path: '', component: NcdComponent },
{ path: 'risk-stratification', component: RiskStratificationComponent },
{ path: 'risk-assessment', component: RiskAssessmentComponent },
{ path: 'questionnaire', component: QuestionnaireComponent },
{ path: 'patient-record', component: PatientRecordComponent },
{ path: 'casdt', component: CasdtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NcdRoutingModule { }
