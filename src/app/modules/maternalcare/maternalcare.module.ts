import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaternalcareRoutingModule } from './maternalcare-routing.module';

import { MaternalcareComponent } from './maternalcare.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { McrComponent } from './modules/mcr/mcr.component';
import { PostpartumComponent } from './modules/postpartum/postpartum.component';
import { RiskfactorsComponent } from './modules/riskfactors/riskfactors.component';
import { PrenatalComponent } from './modules/prenatal/prenatal.component';
@NgModule({
  declarations: [MaternalcareComponent, McrComponent, PostpartumComponent, RiskfactorsComponent, PrenatalComponent],
  imports: [
    CommonModule,
    MaternalcareRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaternalcareModule { }
