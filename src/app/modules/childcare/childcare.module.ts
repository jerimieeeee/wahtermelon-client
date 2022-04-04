import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstVisitComponent } from './components/first-visit/first-visit.component';
import { ServicesComponent } from './components/services/services.component';
import { VaccineInfoComponent } from './components/vaccine-info/vaccine-info.component';
import { BreastfeedingComponent } from './components/breastfeeding/breastfeeding.component';



@NgModule({
  declarations: [
    ChildcareComponent,
    FirstVisitComponent,
    ServicesComponent,
    VaccineInfoComponent,
    BreastfeedingComponent],
  imports: [
    CommonModule,
    ChildcareRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule
  ]
})
export class ChildcareModule { }
