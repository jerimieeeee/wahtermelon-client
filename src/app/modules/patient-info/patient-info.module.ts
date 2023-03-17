import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientInfoRoutingModule } from './patient-info-routing.module';
import { PatientInfoComponent } from './patient-info.component';
import { VitalsModalComponent } from './modals/vitals-modal/vitals-modal.component';
import { DeathRecordComponent } from './components/death-record/death-record.component';
import { FamilyMedicalComponent } from './components/family-medical/family-medical.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { MenstrualHistoryComponent } from './components/menstrual-history/menstrual-history.component';
import { PastMedicalComponent } from './components/past-medical/past-medical.component';
import { PhilhealthComponent } from './components/philhealth/philhealth.component';
import { PregnancyHistoryComponent } from './components/pregnancy-history/pregnancy-history.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { SocialHistoryComponent } from './components/social-history/social-history.component';
import { SurgicalHistoryComponent } from './components/surgical-history/surgical-history.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { AllergiesModalComponent } from './modals/allergies-modal/allergies-modal.component';
import { DeathModalComponent } from './modals/death-modal/death-modal.component';
import { FamHistoryModalComponent } from './modals/fam-history-modal/fam-history-modal.component';
import { HistoryModalComponent } from './modals/history-modal/history-modal.component';
import { LabRequestModalComponent } from './modals/lab-request-modal/lab-request-modal.component';
import { LifestyleModalComponent } from './modals/lifestyle-modal/lifestyle-modal.component';
import { MedicationModalComponent } from './modals/medication-modal/medication-modal.component';
import { MenstrualModalComponent } from './modals/menstrual-modal/menstrual-modal.component';
import { ModuleModalComponent } from './modals/module-modal/module-modal.component';
import { PhilhealthListModalComponent } from './modals/philhealth-list-modal/philhealth-list-modal.component';
import { PhilhealthModalComponent } from './modals/philhealth-modal/philhealth-modal.component';
import { PhotoModalComponent } from './modals/photo-modal/photo-modal.component';
import { PregnancyModalComponent } from './modals/pregnancy-modal/pregnancy-modal.component';
import { SurgicalActionModalComponent } from './modals/surgical-action-modal/surgical-action-modal.component';
import { SurgicalModalComponent } from './modals/surgical-modal/surgical-modal.component';
import { VaccineActionModalComponent } from './modals/vaccine-action-modal/vaccine-action-modal.component';
import { VaccineModalComponent } from './modals/vaccine-modal/vaccine-modal.component';
import { VitalsListModalComponent } from './modals/vitals-list-modal/vitals-list-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { GraphComponent } from './components/graph/graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PatientItrModule } from '../patient-itr/patient-itr.module';
import { PreghistComponent } from './components/preghist/preghist.component';
import { PreghistModalComponent } from './modals/preghist-modal/preghist-modal.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LabRequestComponent } from 'app/shared/shared-modals/lab-request/lab-request.component';


@NgModule({
  declarations: [
    PatientInfoComponent,
    VitalsModalComponent,
    DeathModalComponent,
    VaccineModalComponent,
    MedicationModalComponent,
    HistoryModalComponent,
    FamHistoryModalComponent,
    LifestyleModalComponent,
    AllergiesModalComponent,
    VaccineActionModalComponent,
    VitalsListModalComponent,
    ModuleModalComponent,
    PhilhealthModalComponent,
    PhilhealthListModalComponent,
    LabRequestModalComponent,
    PhotoModalComponent,
    PrescriptionsComponent,
    PastMedicalComponent,
    FamilyMedicalComponent,
    VaccineComponent,
    VitalsComponent,
    PhilhealthComponent,
    LaboratoryComponent,
    SocialHistoryComponent,
    DeathRecordComponent,
    SurgicalHistoryComponent,
    PregnancyHistoryComponent,
    MenstrualHistoryComponent,
    MenstrualModalComponent,
    PregnancyModalComponent,
    SurgicalModalComponent,
    SurgicalActionModalComponent,
    GraphComponent,
    PreghistComponent,
    PreghistModalComponent
  ],
  imports: [
    CommonModule,
    PatientInfoRoutingModule,
    FontAwesomeModule,
    FormsModule,
    WebcamModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    PatientItrModule,
    NgxMaskDirective,
    NgxMaskPipe,
    LabRequestComponent
  ],
  providers: [provideNgxMask()]
})
export class PatientInfoModule { }
