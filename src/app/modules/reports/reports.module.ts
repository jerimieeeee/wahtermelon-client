import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fhsis2018McComponent } from './report/fhsis2018-mc/fhsis2018-mc.component';
import { Fhsis2018CcComponent } from './report/fhsis2018-cc/fhsis2018-cc.component';
import { NameListComponent } from './modals/name-list/name-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderFhsis2018Component } from './components/header-fhsis2018/header-fhsis2018.component';


@NgModule({
  declarations: [
    ReportsComponent,
    Fhsis2018McComponent,
    Fhsis2018CcComponent,
    NameListComponent,
    HeaderFhsis2018Component
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule
  ]
})
export class ReportsModule { }
