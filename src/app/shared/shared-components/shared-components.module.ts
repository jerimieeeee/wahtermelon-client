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
    LabRequestModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot()
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
    LabRequestModalComponent
  ]
})
export class SharedComponentsModule { }
