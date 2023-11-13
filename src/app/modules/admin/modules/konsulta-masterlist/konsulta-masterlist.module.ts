import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaMasterlistRoutingModule } from './konsulta-masterlist-routing.module';
import { KonsultaMasterlistComponent } from './konsulta-masterlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetDateComponent } from './modals/set-date/set-date.component';
import { ImportXmlComponent } from './modals/import-xml/import-xml.component';


@NgModule({
  declarations: [
    KonsultaMasterlistComponent,
    SetDateComponent,
    ImportXmlComponent
  ],
  imports: [
    CommonModule,
    KonsultaMasterlistRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class KonsultaMasterlistModule { }
