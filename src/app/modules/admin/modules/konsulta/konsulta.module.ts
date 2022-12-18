import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaRoutingModule } from './konsulta-routing.module';
import { KonsultaComponent } from './konsulta.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    KonsultaComponent
  ],
  imports: [
    CommonModule,
    KonsultaRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class KonsultaModule { }
