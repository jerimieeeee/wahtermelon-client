import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientItrComponent } from 'src/app/components/patient-itr/patient-itr.component';



@NgModule({
  declarations: [
    PatientItrComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PatientItrComponent
  ]
})
export class SharedComponentsModule { }
