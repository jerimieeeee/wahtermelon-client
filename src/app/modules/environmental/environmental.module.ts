import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentalRoutingModule } from './environmental-routing.module';
import { EnvironmentalComponent } from './environmental.component';


@NgModule({
  declarations: [
    EnvironmentalComponent
  ],
  imports: [
    CommonModule,
    EnvironmentalRoutingModule
  ]
})
export class EnvironmentalModule { }
