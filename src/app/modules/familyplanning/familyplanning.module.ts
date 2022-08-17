import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyplanningRoutingModule } from './familyplanning-routing.module';
import { FamilyplanningComponent } from './familyplanning.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';


@NgModule({
  declarations: [FamilyplanningComponent],
  imports: [
    CommonModule,
    FamilyplanningRoutingModule,
    SharedComponentsModule
  ]
})
export class FamilyplanningModule { }
