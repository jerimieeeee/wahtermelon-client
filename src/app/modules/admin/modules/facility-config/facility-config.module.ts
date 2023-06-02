import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityConfigRoutingModule } from './facility-config-routing.module';
import { FacilityConfigComponent } from './facility-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CatchmentBarangayComponent } from './catchment-barangay/catchment-barangay.component';
import { CatchmentPopulationComponent } from './catchment-population/catchment-population.component';
import { CatchmentBhsComponent } from './catchment-bhs/catchment-bhs.component';


@NgModule({
  declarations: [
    FacilityConfigComponent,
    CatchmentBarangayComponent,
    CatchmentPopulationComponent,
    CatchmentBhsComponent
  ],
  imports: [
    CommonModule,
    FacilityConfigRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class FacilityConfigModule { }
