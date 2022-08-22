import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcareRoutingModule } from './childcare-routing.module';
import { ChildcareComponent } from './childcare.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstVisitComponent } from './components/first-visit/first-visit.component';
import { ServicesComponent } from './components/services/services.component';
import { VaccineInfoComponent } from './components/vaccine-info/vaccine-info.component';
import { BreastfeedingComponent } from './components/breastfeeding/breastfeeding.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/birthinformation.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';


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
    FontAwesomeModule,ReactiveFormsModule,HttpClientModule,
    FormsModule,StoreModule.forRoot({
      birthinfo: reducer
    })
  ]
})
export class ChildcareModule { }
