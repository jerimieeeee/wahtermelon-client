import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseholdsRoutingModule } from './households-routing.module';
import { HouseholdsComponent } from './households.component';


@NgModule({
  declarations: [
    HouseholdsComponent
  ],
  imports: [
    CommonModule,
    HouseholdsRoutingModule
  ]
})
export class HouseholdsModule { }
