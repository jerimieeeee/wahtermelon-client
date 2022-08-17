import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';


@NgModule({
  declarations: [
    ChildcareComponent,
  ],
  imports: [
    CommonModule,
    ChildcareRoutingModule,
    SharedComponentsModule
  ]
})
export class ChildcareModule { }
