import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrugFormComponent } from './modals/drug-form/drug-form.component';
import { LibDrugListComponent } from './modals/lib-drug-list/lib-drug-list.component';


@NgModule({
  declarations: [
    DrugsComponent,
    DrugFormComponent,
    LibDrugListComponent
  ],
  imports: [
    CommonModule,
    DrugsRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DrugsModule { }
