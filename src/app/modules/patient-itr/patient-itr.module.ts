import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientItrRoutingModule } from './patient-itr-routing.module';
import { PatientItrComponent } from './patient-itr.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';

@NgModule({
  declarations: [PatientItrComponent],
  imports: [
    CommonModule,
    PatientItrRoutingModule,
    SharedComponentsModule
  ]
})
export class PatientItrModule { }
