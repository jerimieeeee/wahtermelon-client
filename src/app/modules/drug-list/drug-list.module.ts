import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugListRoutingModule } from './drug-list-routing.module';
import { DrugListComponent } from './drug-list.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    DrugListComponent,
    DrugsComponent
  ],
  imports: [
    CommonModule,
    DrugListRoutingModule,FontAwesomeModule, Ng2SearchPipeModule, FormsModule
  ]
})
export class DrugListModule { }
