import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FamilyplanningRoutingModule } from './familyplanning-routing.module';
import { FamilyplanningComponent } from './familyplanning.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FirstvisitComponent } from './firstvisit/firstvisit.component';
import { FpchartComponent } from './fpchart/fpchart.component';
import { FphxComponent } from './fphx/fphx.component';
import { FppeComponent } from './fppe/fppe.component';
import { PelvicexamComponent } from './pelvicexam/pelvicexam.component';
import * as angularFontawesome from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FamilyplanningComponent, FirstvisitComponent, FpchartComponent, FphxComponent, FppeComponent, PelvicexamComponent],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
  ]
})
export class FamilyplanningModule { }
