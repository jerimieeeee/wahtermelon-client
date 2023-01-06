import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitAccredRoutingModule } from './facilit-accred-routing.module';
import { FacilitAccredComponent } from './facilit-accred.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { FacilityFormComponent } from './modals/facility-form/facility-form.component';


@NgModule({
  declarations: [
    FacilitAccredComponent,
    FacilityFormComponent
  ],
  imports: [
    CommonModule,
    FacilitAccredRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class FacilitAccredModule { }
