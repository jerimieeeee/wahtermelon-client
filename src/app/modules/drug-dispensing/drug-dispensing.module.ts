import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugDispensingRoutingModule } from './drug-dispensing-routing.module';
import { DrugDispensingComponent } from './drug-dispensing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';


@NgModule({
  declarations: [
    DrugDispensingComponent
  ],
  imports: [
    CommonModule,
    DrugDispensingRoutingModule,
    FontAwesomeModule,
    FormsModule,
    EndVisitComponent
  ]
})
export class DrugDispensingModule { }
