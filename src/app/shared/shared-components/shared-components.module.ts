import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { WebcamModule } from 'ngx-webcam';
import { KonsultaComponent } from './konsulta/konsulta.component';
import { EclaimsComponent } from './eclaims/eclaims.component';
import { EpresComponent } from './konsulta/modals/epres/epres.component';
import { EkasComponent } from './konsulta/modals/ekas/ekas.component';
import { PbefComponent } from './eclaims/modals/pbef/pbef.component';
import { Cf1Component } from './eclaims/modals/cf1/cf1.component';
import { Cf2Component } from './eclaims/modals/cf2/cf2.component';
import { EndVisitComponent } from '../shared-modals/end-visit/end-visit.component';

@NgModule({
  declarations: [
    KonsultaComponent,
    EclaimsComponent,
    EpresComponent,
    EkasComponent,
    PbefComponent,
    Cf1Component,
    Cf2Component,
    EndVisitComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    WebcamModule
  ],
  exports: [
    KonsultaComponent,
    EclaimsComponent,
    EndVisitComponent,
    EpresComponent
  ]
})
export class SharedComponentsModule { }
