import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugListRoutingModule } from './drug-list-routing.module';
import { DrugListComponent } from './drug-list.component';


@NgModule({
  declarations: [
    DrugListComponent
  ],
  imports: [
    CommonModule,
    DrugListRoutingModule
  ]
})
export class DrugListModule { }
