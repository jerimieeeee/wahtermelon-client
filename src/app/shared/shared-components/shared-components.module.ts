import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientItrComponent } from 'src/app/components/patient-itr/patient-itr.component';
import { PatientInfoComponent } from 'src/app/components/patient-info/patient-info.component';



@NgModule({
  declarations: [
    PatientItrComponent,
    PatientInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PatientItrComponent,
    PatientInfoComponent
  ]
})
export class SharedComponentsModule { }
