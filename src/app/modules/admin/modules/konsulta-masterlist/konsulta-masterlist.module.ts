import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaMasterlistRoutingModule } from './konsulta-masterlist-routing.module';
import { KonsultaMasterlistComponent } from './konsulta-masterlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetDateComponent } from './modals/set-date/set-date.component';
import { ImportXmlComponent } from './modals/import-xml/import-xml.component';
import { ExportAsModule } from 'ngx-export-as';


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
    ReactiveFormsModule,
    ExportAsModule
  ]
})
export class KonsultaMasterlistModule { }
