import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialDxComponent } from './components/initial-dx/initial-dx.component';
import { FinalDxComponent } from './components/final-dx/final-dx.component';
import { PhysicalExamComponent } from './components/physical-exam/physical-exam.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { ComplaintHistoryComponent } from './components/complaint-history/complaint-history.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { ConsultHistoryComponent } from './components/consult-history/consult-history.component';
import { ConsultSummaryComponent } from './components/consult-summary/consult-summary.component';
import { DrugListComponent } from './components/prescription/modals/drug-list/drug-list.component';
import { DrugFormComponent } from './components/prescription/modals/drug-form/drug-form.component';
import { DrugDeleteComponent } from './components/prescription/modals/drug-delete/drug-delete.component';
import { GeneralSurveyComponent } from './components/general-survey/general-survey.component';
import { ManagementComponent } from './components/management/management.component';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { GbvReferralComponent } from './components/complaint-history/modals/gbv-referral/gbv-referral.component';
import { OpenConsultComponent } from 'app/shared/shared-modals/open-consult/open-consult.component';
import { UpdateDateComponent } from './modals/update-date/update-date.component';

@NgModule({
  declarations: [
    ConsultationComponent,
    InitialDxComponent,
    FinalDxComponent,
    PhysicalExamComponent,
    PrescriptionComponent,
    ComplaintHistoryComponent,
    GraphsComponent,
    ConsultHistoryComponent,
    ConsultSummaryComponent,
    DrugListComponent,
    DrugFormComponent,
    DrugDeleteComponent,
    GeneralSurveyComponent,
    ManagementComponent,
    GbvReferralComponent,
    UpdateDateComponent
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteItemComponent,
    EndVisitComponent,
    OpenConsultComponent
  ]
})
export class ConsultationModule { }
