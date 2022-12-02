import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientItrRoutingModule } from './patient-itr-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { PatientItrComponent } from './patient-itr.component';
import { TakePhotoComponent } from './modals/take-photo/take-photo.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PatientItrComponent,
    TakePhotoComponent
  ],
  imports: [
    CommonModule,
    PatientItrRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class PatientItrModule { }
