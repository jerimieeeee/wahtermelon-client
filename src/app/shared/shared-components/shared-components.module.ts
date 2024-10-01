import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { KonsultaComponent } from './konsulta/konsulta.component';
import { EclaimsComponent } from './eclaims/eclaims.component';
import { EpresComponent } from './konsulta/modals/epres/epres.component';
import { EkasComponent } from './konsulta/modals/ekas/ekas.component';
import { PbefComponent } from './eclaims/modals/pbef/pbef.component';
import { Cf1Component } from './eclaims/modals/cf1/cf1.component';
import { Cf2Component } from './eclaims/modals/cf2/cf2.component';
import { NgxPrintModule } from 'ngx-print';
import { ExportAsModule } from 'ngx-export-as-17';
import { UploadClaimsComponent } from './eclaims/modals/upload-claims/upload-claims.component';
import { DeleteItemComponent } from '../shared-modals/delete-item/delete-item.component';
import { UploadRequiredClaimsComponent } from './eclaims/modals/upload-required-claims/upload-required-claims.component';

@NgModule({
  declarations: [
    KonsultaComponent,
    EclaimsComponent,
    EpresComponent,
    EkasComponent,
    PbefComponent,
    Cf1Component,
    Cf2Component,
    UploadClaimsComponent,
    UploadRequiredClaimsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    WebcamModule,
    NgxPrintModule,
    ExportAsModule,
    DeleteItemComponent
  ],
  exports: [
    KonsultaComponent,
    EclaimsComponent,
    EpresComponent,
    EkasComponent,
    UploadClaimsComponent,
    UploadRequiredClaimsComponent,
  ]
})
export class SharedComponentsModule { }
