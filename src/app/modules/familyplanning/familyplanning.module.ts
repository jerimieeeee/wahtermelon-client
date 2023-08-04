import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FamilyplanningRoutingModule } from './familyplanning-routing.module';

import { FamilyplanningComponent } from './familyplanning.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { FpchartComponent } from './modules/fpchart/fpchart.component';
import { FirsvisitComponent } from './modules/firsvisit/firsvisit.component';
import { FppeComponent } from './modules/fppe/fppe.component';
import { FphxComponent } from './modules/fphx/fphx.component';
import { ObshxComponent } from './modules/obshx/obshx.component';
import { PelvicComponent } from './modules/pelvic/pelvic.component';
import { MethodsComponent } from './modules/methods/methods.component';
import { ModalsComponent } from './modules/fpchart/modals/modals.component';
import { MethodsModalComponent } from './modules/methods/methods-modal/methods-modal.component';

@NgModule({
  declarations: [FamilyplanningComponent, FpchartComponent, FirsvisitComponent, FppeComponent, FphxComponent, ObshxComponent, PelvicComponent, MethodsComponent, ModalsComponent, MethodsModalComponent,
    //  FpchartComponent, FphxComponent, FppeComponent, PelvicexamComponent
  ],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FamilyplanningModule { }
