import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityConfigRoutingModule } from './facility-config-routing.module';
import { FacilityConfigComponent } from './facility-config.component';

import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HealthFacilityComponent } from './components/health-facility/health-facility.component';
import { CatchmentPopulationComponent } from './components/catchment-population/catchment-population.component';
import { BhsComponent } from './components/bhs/bhs.component';
import { MorbidityCalendarComponent } from './components/morbidity-calendar/morbidity-calendar.component';
import { PhieComponent } from './components/phie/phie.component';
import { RetrievePhicComponent } from './components/retrieve-phic/retrieve-phic.component';


@NgModule({
  declarations: [
    FacilityConfigComponent,
    HealthFacilityComponent,
    CatchmentPopulationComponent,
    BhsComponent,
    MorbidityCalendarComponent,
    PhieComponent,
    RetrievePhicComponent
  ],
  imports: [
    CommonModule,
    FacilityConfigRoutingModule,SharedComponentsModule,FontAwesomeModule
  ]
})
export class FacilityConfigModule { }
