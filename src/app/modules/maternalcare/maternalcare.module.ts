import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaternalcareRoutingModule } from './maternalcare-routing.module';

import { MaternalcareComponent } from './maternalcare.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { McrComponent } from './modules/mcr/mcr.component';
import { PostpartumComponent } from './modules/postpartum/postpartum.component';
import { RiskfactorsComponent } from './modules/riskfactors/riskfactors.component';
import { PrenatalComponent } from './modules/prenatal/prenatal.component';
import { ServicesComponent } from './modules/services/services.component';
import { PostvisitsComponent } from './modules/postvisits/postvisits.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { TerminatePregnancyComponent } from './modals/terminate-pregnancy/terminate-pregnancy.component';
@NgModule({
  declarations: [
    MaternalcareComponent,
    McrComponent,
    PostpartumComponent,
    RiskfactorsComponent,
    PrenatalComponent,
    ServicesComponent,
    PostvisitsComponent,
    TerminatePregnancyComponent
  ],
  imports: [
    CommonModule,
    MaternalcareRoutingModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EndVisitComponent,
    CaserateComponent,
    SharedComponentsModule
  ]
})
export class MaternalcareModule { }
