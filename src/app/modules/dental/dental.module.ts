import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalRoutingModule } from './dental-routing.module';
import { DentalComponent } from './dental.component';
import { ToothConditionComponent } from './modals/tooth-condition/tooth-condition.component';
import { ToothServicesComponent } from './modals/tooth-services/tooth-services.component';
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
import { HospitalizationHistoryComponent } from './components/hospitalization-history/hospitalization-history.component';
import { SurgicalHistoryComponent } from './components/surgical-history/surgical-history.component';
import { PrescriptionComponent } from 'app/shared/shared-components/consultation/prescription/prescription.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { PregnantTagComponent } from 'app/shared/shared-components/consultation/pregnant-tag/pregnant-tag.component';
import { SuppliesComponent } from 'app/shared/shared-components/consultation/supplies/supplies.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';


@NgModule({
  declarations: [
    DentalComponent,
    ToothConditionComponent,
    ToothServicesComponent,
    HistoryComponent,
    ConditionComponent,
    ServicesComponent,
    HospitalizationHistoryComponent,
    SurgicalHistoryComponent
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
    PrescriptionComponent,
    GeneralSurveyComponent,
    InitialDxComponent,
    ManagementComponent,
    DeleteItemComponent,
    EndVisitComponent,
    PregnantTagComponent,
    SuppliesComponent,
    SharedComponentsModule,
    CaserateComponent
  ]
})
export class DentalModule { }
