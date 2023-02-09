import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fhsis2018McComponent } from './report/fhsis2018-mc/fhsis2018-mc.component';
import { Fhsis2018CcComponent } from './report/fhsis2018-cc/fhsis2018-cc.component';


@NgModule({
  declarations: [
    ReportsComponent,
    Fhsis2018McComponent,
    Fhsis2018CcComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReportsModule { }
