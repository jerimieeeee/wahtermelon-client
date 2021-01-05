import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FirstvisitComponent } from './firstvisit/firstvisit.component';


@NgModule({
  declarations: [
    ChildcareComponent,
    FirstvisitComponent,
  ],
  imports: [
    CommonModule,
    ChildcareRoutingModule,
    SharedComponentsModule
  ]
})
export class ChildcareModule { }
