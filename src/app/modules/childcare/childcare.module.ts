import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ChildcareComponent],
  imports: [
    CommonModule,
    ChildcareRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule
  ]
})
export class ChildcareModule { }
