import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaternalcareRoutingModule } from './maternalcare-routing.module';

import { MaternalcareComponent } from './maternalcare.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import * as angularFontawesome from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MaternalcareComponent],
  imports: [
    CommonModule,
    MaternalcareRoutingModule,
    CommonModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaternalcareModule { }
