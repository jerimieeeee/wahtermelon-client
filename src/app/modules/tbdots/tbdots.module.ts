import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TbdotsRoutingModule } from './tbdots-routing.module';

import { TbdotsComponent } from './tbdots.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as angularFontawesome from '@fortawesome/angular-fontawesome';

import { CasefindingsComponent } from './modules/casefindings/casefindings.component';

@NgModule({
  declarations: [
    TbdotsComponent,
    CasefindingsComponent
  ],
  imports: [
    CommonModule,
    TbdotsRoutingModule,
    SharedComponentsModule,
    angularFontawesome.FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TbdotsModule { }
