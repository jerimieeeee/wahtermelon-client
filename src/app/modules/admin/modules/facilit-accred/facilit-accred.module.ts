import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitAccredRoutingModule } from './facilit-accred-routing.module';
import { FacilitAccredComponent } from './facilit-accred.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FacilitAccredComponent
  ],
  imports: [
    CommonModule,
    FacilitAccredRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class FacilitAccredModule { }
