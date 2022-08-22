import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { PatientRegistrationComponent } from './patient-registration.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    FormsModule

  ]
})
export class PatientRegistrationModule { }
