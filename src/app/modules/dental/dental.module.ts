import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalRoutingModule } from './dental-routing.module';
import { DentalComponent } from './dental.component';


@NgModule({
  declarations: [
    DentalComponent
  ],
  imports: [
    CommonModule,
    DentalRoutingModule
  ]
})
export class DentalModule { }
