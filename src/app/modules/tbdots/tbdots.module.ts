import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TbdotsRoutingModule } from './tbdots-routing.module';

import { TbdotsComponent } from './tbdots.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { CasefindingsComponent } from './modules/casefindings/casefindings.component';
import { CaseHoldingComponent } from './modules/case-holding/case-holding.component';
import { DotsChartComponent } from './modules/dots-chart/dots-chart.component';
import { PrescriptionComponent } from './modules/prescription/prescription.component';

@NgModule({
  declarations: [
    TbdotsComponent,
    CasefindingsComponent,
    CaseHoldingComponent,
    DotsChartComponent,
    PrescriptionComponent
  ],
  imports: [
    CommonModule,
    TbdotsRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TbdotsModule { }
