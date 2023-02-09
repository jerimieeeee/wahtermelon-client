import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabConfigRoutingModule } from './lab-config-routing.module';
import { LabConfigComponent } from './lab-config.component';


@NgModule({
  declarations: [
    LabConfigComponent
  ],
  imports: [
    CommonModule,
    LabConfigRoutingModule
  ]
})
export class LabConfigModule { }
