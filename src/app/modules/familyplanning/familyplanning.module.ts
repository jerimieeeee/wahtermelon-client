import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FamilyplanningRoutingModule } from './familyplanning-routing.module';

import { FamilyplanningComponent } from './familyplanning.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';

import { FpchartComponent } from './modules/fpchart/fpchart.component';
import { FirsvisitComponent } from './modules/firsvisit/firsvisit.component';
import { FppeComponent } from './modules/fppe/fppe.component';
import { FphxComponent } from './modules/fphx/fphx.component';
import { ObshxComponent } from './modules/obshx/obshx.component';
import { PelvicComponent } from './modules/pelvic/pelvic.component';
import { MethodsComponent } from './modules/methods/methods.component';

@NgModule({
  declarations: [FamilyplanningComponent, FpchartComponent, FirsvisitComponent, FppeComponent, FphxComponent, ObshxComponent, PelvicComponent, MethodsComponent, 
    //  FpchartComponent, FphxComponent, FppeComponent, PelvicexamComponent
  ],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FamilyplanningModule { }
