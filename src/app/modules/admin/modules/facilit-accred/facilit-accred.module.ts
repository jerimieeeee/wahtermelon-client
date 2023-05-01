import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitAccredRoutingModule } from './facilit-accred-routing.module';
import { FacilitAccredComponent } from './facilit-accred.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityFormComponent } from './modals/facility-form/facility-form.component';
import { FacilityDeleteComponent } from './modals/facility-delete/facility-delete.component';


@NgModule({
  declarations: [
    FacilitAccredComponent,
    FacilityFormComponent,
    FacilityDeleteComponent
  ],
  imports: [
    CommonModule,
    FacilitAccredRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FacilitAccredModule { }
