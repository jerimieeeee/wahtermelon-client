import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseholdsRoutingModule } from './households-routing.module';
import { HouseholdsComponent } from './households.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    HouseholdsComponent
  ],
  imports: [
    CommonModule,
    HouseholdsRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class HouseholdsModule { }
