import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { PatientRegistrationComponent } from './patient-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class PatientRegistrationModule { }
