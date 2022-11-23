import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { LeprosyComponent } from './leprosy.component';

import { LeprosyRoutingModule } from './leprosy-routing.module';
import { CaseinfoComponent } from './modules/caseinfo/caseinfo.component';
import { BodychartComponent } from './modules/bodychart/bodychart.component';
import { EhfscoreComponent } from './modules/ehfscore/ehfscore.component';
import { NfascoreComponent } from './modules/nfascore/nfascore.component';
import { VmtestComponent } from './modules/vmtest/vmtest.component';
import { TxrecordComponent } from './modules/txrecord/txrecord.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeprosyComponent,
    CaseinfoComponent,
    BodychartComponent,
    EhfscoreComponent,
    NfascoreComponent,
    VmtestComponent,
    TxrecordComponent
  ],
  imports: [
    CommonModule,
    LeprosyRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LeprosyModule { }
