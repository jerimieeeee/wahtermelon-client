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
import { AlertPromptComponent } from './modals/alert-prompt/alert-prompt.component';
import { DrugListComponent } from './components/prescription/modals/drug-list/drug-list.component';
import { DrugFormComponent } from './components/prescription/modals/drug-form/drug-form.component';
import { DrugDeleteComponent } from './components/prescription/modals/drug-delete/drug-delete.component';


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
    AlertPromptComponent,
    DrugListComponent,
    DrugFormComponent,
    DrugDeleteComponent
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConsultationModule { }
