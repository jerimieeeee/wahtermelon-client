import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRoutingModule } from './eclaims-routing.module';
import { EclaimsComponent } from './eclaims.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { ImportXmlComponent } from './modals/import-xml/import-xml.component';
import { VoucherDetailsComponent } from 'app/shared/shared-components/eclaims/voucher-details/voucher-details.component';


@NgModule({
  declarations: [
    EclaimsComponent
  ],
  imports: [
    CommonModule,
    EclaimsRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SharedComponentsModule,
    ImportXmlComponent,
    VoucherDetailsComponent
  ]
})
export class EclaimsModule { }
