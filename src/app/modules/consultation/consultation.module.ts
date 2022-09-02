import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ConsultationComponent
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule
  ]
})
export class ConsultationModule { }
