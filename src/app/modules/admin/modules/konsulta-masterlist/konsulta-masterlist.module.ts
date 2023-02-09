import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaMasterlistRoutingModule } from './konsulta-masterlist-routing.module';
import { KonsultaMasterlistComponent } from './konsulta-masterlist.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetDateComponent } from './modals/set-date/set-date.component';


@NgModule({
  declarations: [
    KonsultaMasterlistComponent,
    SetDateComponent
  ],
  imports: [
    CommonModule,
    KonsultaMasterlistRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class KonsultaMasterlistModule { }
