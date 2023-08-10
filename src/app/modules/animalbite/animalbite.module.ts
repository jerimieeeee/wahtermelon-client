import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalbiteRoutingModule } from './animalbite-routing.module';
import { AnimalbiteComponent } from './animalbite.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbPreexposureComponent } from './components/ab-preexposure/ab-preexposure.component';
import { AbExposureComponent } from './components/ab-exposure/ab-exposure.component';
import { AbOutcomeComponent } from './modals/ab-outcome/ab-outcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreExposureModalComponent } from './modals/pre-exposure-modal/pre-exposure-modal.component';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';
import { AbPostexposureComponent } from './components/ab-postexposure/ab-postexposure.component';


@NgModule({
  declarations: [
    AnimalbiteComponent,
    AbPreexposureComponent,
    AbExposureComponent,
    AbOutcomeComponent,
    PreExposureModalComponent,
    AbPostexposureComponent
  ],
  imports: [
    CommonModule,
    AnimalbiteRoutingModule,
    EndVisitComponent,
    SharedComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CaserateComponent
  ]
})
export class AnimalbiteModule { }
