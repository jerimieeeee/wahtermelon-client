import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRoutingModule } from './eclaims-routing.module';
import { EclaimsComponent } from './eclaims.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';


@NgModule({
  declarations: [
    EclaimsComponent
  ],
  imports: [
    CommonModule,
    EclaimsRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class EclaimsModule { }
