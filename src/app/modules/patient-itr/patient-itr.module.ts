import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientItrRoutingModule } from './patient-itr-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { PatientItrComponent } from './patient-itr.component';
import { TakePhotoComponent } from './modals/take-photo/take-photo.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import { ConsultationComponent } from './components/visit-details/group/consultation/consultation.component';
import { NcdComponent } from './components/visit-details/group/ncd/ncd.component';
import { CcComponent } from './components/visit-details/group/cc/cc.component';
import { McComponent } from './components/visit-details/group/mc/mc.component';

@NgModule({
  declarations: [
    PatientItrComponent,
    TakePhotoComponent,
    VisitDetailsComponent,
    ConsultationComponent,
    NcdComponent,
    CcComponent,
    McComponent
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
