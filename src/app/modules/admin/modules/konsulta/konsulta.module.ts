import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaRoutingModule } from './konsulta-routing.module';
import { KonsultaComponent } from './konsulta.component';


@NgModule({
  declarations: [
    KonsultaComponent
  ],
  imports: [
    CommonModule,
    KonsultaRoutingModule
  ]
})
export class KonsultaModule { }
