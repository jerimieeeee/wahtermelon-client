import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientItrRoutingModule } from './patient-itr-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { PatientItrComponent } from './patient-itr.component';
import { TakePhotoComponent } from './modals/take-photo/take-photo.component';

@NgModule({
  declarations: [
    PatientItrComponent,
    TakePhotoComponent
  ],
  imports: [
    CommonModule,
    PatientItrRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule
  ]
})
export class PatientItrModule { }
