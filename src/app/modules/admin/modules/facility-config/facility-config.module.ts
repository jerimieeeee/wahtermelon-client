import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityConfigRoutingModule } from './facility-config-routing.module';
import { FacilityConfigComponent } from './facility-config.component';


@NgModule({
  declarations: [
    FacilityConfigComponent
  ],
  imports: [
    CommonModule,
    FacilityConfigRoutingModule
  ]
})
export class FacilityConfigModule { }
