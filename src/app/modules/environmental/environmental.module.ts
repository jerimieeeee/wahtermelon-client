import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentalRoutingModule } from './environmental-routing.module';
import { EnvironmentalComponent } from './environmental.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EnvironmentalComponent
  ],
  imports: [
    CommonModule,
    EnvironmentalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EnvironmentalModule { }
