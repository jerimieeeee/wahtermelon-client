import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitAccredRoutingModule } from './facilit-accred-routing.module';
import { FacilitAccredComponent } from './facilit-accred.component';


@NgModule({
  declarations: [
    FacilitAccredComponent
  ],
  imports: [
    CommonModule,
    FacilitAccredRoutingModule
  ]
})
export class FacilitAccredModule { }
