import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRthRoutingModule } from './eclaims-rth-routing.module';
import { EclaimsRthComponent } from './eclaims-rth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { UploadRthDocsComponent } from './modals/upload-rth-docs/upload-rth-docs.component';


@NgModule({
  declarations: [
    EclaimsRthComponent,
    UploadRthDocsComponent
  ],
  imports: [
    CommonModule,
    EclaimsRthRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class EclaimsRthModule { }
