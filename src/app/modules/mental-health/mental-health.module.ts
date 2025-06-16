import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentalHealthRoutingModule } from './mental-health-routing.module';
import { MentalHealthComponent } from './mental-health.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';


@NgModule({
  declarations: [
    MentalHealthComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    MentalHealthRoutingModule,
    EndVisitComponent
  ]
})
export class MentalHealthModule { }
