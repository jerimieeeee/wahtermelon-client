import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VitalsModalComponent } from 'app/components/patient-info/modals/vitals-modal/vitals-modal.component';
import { DeathModalComponent } from 'app/components/patient-info/modals/death-modal/death-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineModalComponent } from 'app/components/patient-info/modals/vaccine-modal/vaccine-modal.component';
import { MedicationModalComponent } from 'app/components/patient-info/modals/medication-modal/medication-modal.component';
import { HistoryModalComponent } from 'app/components/patient-info/modals/history-modal/history-modal.component';
import { FamHistoryModalComponent } from 'app/components/patient-info/modals/fam-history-modal/fam-history-modal.component';
import { LifestyleModalComponent } from 'app/components/patient-info/modals/lifestyle-modal/lifestyle-modal.component';
import { AllergiesModalComponent } from 'app/components/patient-info/modals/allergies-modal/allergies-modal.component';
import { VaccineActionModalComponent } from 'app/components/patient-info/modals/vaccine-action-modal/vaccine-action-modal.component';
import { VitalsListModalComponent } from 'app/components/patient-info/modals/vitals-list-modal/vitals-list-modal.component';
import { ModuleModalComponent } from 'app/components/patient-info/modals/module-modal/module-modal.component';
import { PhilhealthModalComponent } from 'app/components/patient-info/modals/philhealth-modal/philhealth-modal.component';
import { PhilhealthListModalComponent } from 'app/components/patient-info/modals/philhealth-list-modal/philhealth-list-modal.component';
import { NgxMaskModule } from 'ngx-mask';
import { LabRequestModalComponent } from 'app/components/patient-info/modals/lab-request-modal/lab-request-modal.component';
import { PhotoModalComponent } from 'app/components/patient-info/modals/photo-modal/photo-modal.component';
import { WebcamModule } from 'ngx-webcam';
import { KonsultaComponent } from './konsulta/konsulta.component';
import { EclaimsComponent } from './eclaims/eclaims.component';
import { EpresComponent } from './konsulta/modals/epres/epres.component';
import { EkasComponent } from './konsulta/modals/ekas/ekas.component';
import { PbefComponent } from './eclaims/modals/pbef/pbef.component';
import { Cf1Component } from './eclaims/modals/cf1/cf1.component';
import { Cf2Component } from './eclaims/modals/cf2/cf2.component';
import { PrescriptionsComponent } from 'app/components/patient-info/components/prescriptions/prescriptions.component';
import { EndVisitComponent } from '../shared-modals/end-visit/end-visit.component';
import { PastMedicalComponent } from 'app/components/patient-info/components/past-medical/past-medical.component';
import { FamilyMedicalComponent } from 'app/components/patient-info/components/family-medical/family-medical.component';
import { VaccineComponent } from 'app/components/patient-info/components/vaccine/vaccine.component';
import { VitalsComponent } from 'app/components/patient-info/components/vitals/vitals.component';
import { PhilhealthComponent } from 'app/components/patient-info/components/philhealth/philhealth.component';
import { LaboratoryComponent } from 'app/components/patient-info/components/laboratory/laboratory.component';
import { SocialHistoryComponent } from 'app/components/patient-info/components/social-history/social-history.component';
import { DeathRecordComponent } from 'app/components/patient-info/components/death-record/death-record.component';

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
    KonsultaComponent,
    EclaimsComponent,
    EpresComponent,
    EkasComponent,
    PbefComponent,
    Cf1Component,
    Cf2Component,
    PrescriptionsComponent,
    EndVisitComponent,
    PastMedicalComponent,
    FamilyMedicalComponent,
    VaccineComponent,
    VitalsComponent,
    PhilhealthComponent,
    LaboratoryComponent,
    SocialHistoryComponent,
    DeathRecordComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    WebcamModule
  ],
  exports: [
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
    KonsultaComponent,
    EclaimsComponent,
    EndVisitComponent
  ]
})
export class SharedComponentsModule { }
