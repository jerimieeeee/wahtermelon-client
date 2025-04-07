import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TbdotsRoutingModule } from './tbdots-routing.module';

import { TbdotsComponent } from './tbdots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { CasefindingsComponent } from './modules/casefindings/casefindings.component';
import { CaseHoldingComponent } from './modules/case-holding/case-holding.component';
import { DotsChartComponent } from './modules/dots-chart/dots-chart.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { TreatmentOutcomeComponent } from './modals/treatment-outcome/treatment-outcome.component';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';
import { EclaimsComponent } from 'app/shared/shared-components/eclaims/eclaims.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { InitialDxComponent } from 'app/shared/shared-components/consultation/initial-dx/initial-dx.component';
import { FinalDxComponent } from 'app/shared/shared-components/consultation/final-dx/final-dx.component';
import { PrescriptionComponent } from 'app/shared/shared-components/consultation/prescription/prescription.component';
import { SuppliesComponent } from 'app/shared/shared-components/consultation/supplies/supplies.component';

@NgModule({
  declarations: [
    TbdotsComponent,
    CasefindingsComponent,
    CaseHoldingComponent,
    DotsChartComponent,
    TreatmentOutcomeComponent
  ],
  imports: [
    CommonModule,
    TbdotsRoutingModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EndVisitComponent,
    DeleteItemComponent,
    CaserateComponent,
    SharedComponentsModule,
    InitialDxComponent,
    FinalDxComponent,
    PrescriptionComponent,
    SuppliesComponent
  ]
})
export class TbdotsModule { }
