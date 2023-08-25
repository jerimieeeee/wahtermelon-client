import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FamilyplanningRoutingModule } from './familyplanning-routing.module';

import { FamilyplanningComponent } from './familyplanning.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FpchartComponent } from './modules/fpchart/fpchart.component';
import { FirsvisitComponent } from './modules/firsvisit/firsvisit.component';
import { FppeComponent } from './modules/fppe/fppe.component';
import { FphxComponent } from './modules/fphx/fphx.component';
import { ObshxComponent } from './modules/obshx/obshx.component';
import { PelvicComponent } from './modules/pelvic/pelvic.component';
import { MethodsComponent } from './modules/methods/methods.component';
import { MethodsModalComponent } from './modules/methods/methods-modal/methods-modal.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FpchartModalComponent } from './modules/fpchart/fpchart-modal/fpchart-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FamilyplanningComponent, FpchartComponent, FirsvisitComponent, FppeComponent, FphxComponent, ObshxComponent, PelvicComponent, MethodsComponent, MethodsModalComponent, FpchartModalComponent,
    //  FpchartComponent, FphxComponent, FppeComponent, PelvicexamComponent
  ],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    EndVisitComponent,
    DeleteItemComponent
  ]
})
export class FamilyplanningModule { }
