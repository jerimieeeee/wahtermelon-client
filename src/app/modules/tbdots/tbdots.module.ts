import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TbdotsRoutingModule } from './tbdots-routing.module';

import { TbdotsComponent } from './tbdots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { CasefindingsComponent } from './modules/casefindings/casefindings.component';
import { CaseHoldingComponent } from './modules/case-holding/case-holding.component';
import { DotsChartComponent } from './modules/dots-chart/dots-chart.component';
import { PrescriptionComponent } from './modules/prescription/prescription.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { TreatmentOutcomeComponent } from './modals/treatment-outcome/treatment-outcome.component';

@NgModule({
  declarations: [
    TbdotsComponent,
    CasefindingsComponent,
    CaseHoldingComponent,
    DotsChartComponent,
    PrescriptionComponent,
    TreatmentOutcomeComponent
  ],
  imports: [
    CommonModule,
    TbdotsRoutingModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EndVisitComponent,
    DeleteItemComponent
  ]
})
export class TbdotsModule { }
