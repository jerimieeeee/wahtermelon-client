import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRoutingModule } from './eclaims-routing.module';
import { EclaimsComponent } from './eclaims.component';


@NgModule({
  declarations: [
    EclaimsComponent
  ],
  imports: [
    CommonModule,
    EclaimsRoutingModule
  ]
})
export class EclaimsModule { }
