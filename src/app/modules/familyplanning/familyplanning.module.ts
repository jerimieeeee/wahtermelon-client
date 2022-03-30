import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FamilyplanningRoutingModule } from './familyplanning-routing.module';
import { FamilyplanningComponent } from './familyplanning.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
// import { FirstvisitComponent } from './firstvisit/firstvisit.component';
import * as angularFontawesome from '@fortawesome/angular-fontawesome';
import { FpchartComponent } from './fpchart/fpchart.component';
import { FirsvisitComponent } from './firsvisit/firsvisit.component';
import { FppeComponent } from './fppe/fppe.component';
import { FphxComponent } from './fphx/fphx.component';

@NgModule({
  declarations: [FamilyplanningComponent, FpchartComponent, FirsvisitComponent, FppeComponent, FphxComponent, 
    //  FpchartComponent, FphxComponent, FppeComponent, PelvicexamComponent
  ],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
  ]
})
export class FamilyplanningModule { }
