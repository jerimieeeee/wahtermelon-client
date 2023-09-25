import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRoutingModule } from './eclaims-routing.module';
import { EclaimsComponent } from './eclaims.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EclaimsComponent
  ],
  imports: [
    CommonModule,
    EclaimsRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class EclaimsModule { }
