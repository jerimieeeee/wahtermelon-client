import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstVisitComponent } from './components/first-visit/first-visit.component';
import { ServicesComponent } from './components/services/services.component';
import { VaccineInfoComponent } from './components/vaccine-info/vaccine-info.component';
import { BreastfeedingComponent } from './components/breastfeeding/breastfeeding.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';
import { FinalDxComponent } from 'app/shared/shared-components/consultation/final-dx/final-dx.component';
import { PrescriptionComponent } from 'app/shared/shared-components/consultation/prescription/prescription.component';
import { SuppliesComponent } from 'app/shared/shared-components/consultation/supplies/supplies.component';



@NgModule({
  declarations: [
    ChildcareComponent,
    FirstVisitComponent,
    ServicesComponent,
    VaccineInfoComponent,
    BreastfeedingComponent,
  ],
  imports: [
    CommonModule,
    ChildcareRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    EndVisitComponent,
    CaserateComponent,
    SharedComponentsModule,
    FinalDxComponent,
    PrescriptionComponent,
    SuppliesComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ] })
export class ChildcareModule { }
