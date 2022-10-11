import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VitalsModalComponent } from 'app/components/patient-info/modals/vitals-modal/vitals-modal.component';
import { DeathModalComponent } from 'app/components/patient-info/modals/death-modal/death-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineModalComponent } from 'app/components/patient-info/modals/vaccine-modal/vaccine-modal.component';



@NgModule({
  declarations: [
    PatientInfoComponent,
    VitalsModalComponent,
    DeathModalComponent,
    VaccineModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PatientInfoComponent,
    VitalsModalComponent,
    DeathModalComponent,
    VaccineModalComponent
  ]
})
export class SharedComponentsModule { }
