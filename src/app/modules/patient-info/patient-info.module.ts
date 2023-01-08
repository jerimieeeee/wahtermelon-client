import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientInfoRoutingModule } from './patient-info-routing.module';
import { PatientInfoComponent } from './patient-info.component';


@NgModule({
  declarations: [
    PatientInfoComponent
  ],
  imports: [
    CommonModule,
    PatientInfoRoutingModule
  ]
})
export class PatientInfoModule { }
