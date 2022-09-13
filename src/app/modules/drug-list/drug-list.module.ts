import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugListRoutingModule } from './drug-list-routing.module';
import { DrugListComponent } from './drug-list.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DrugListComponent,
    DrugsComponent
  ],
  imports: [
    CommonModule,
    DrugListRoutingModule,FontAwesomeModule
  ]
})
export class DrugListModule { }
