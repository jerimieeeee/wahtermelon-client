import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonsultaRoutingModule } from './konsulta-routing.module';
import { KonsultaComponent } from './konsulta.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForValidationComponent } from './components/for-validation/for-validation.component';
import { ValidatedListComponent } from './components/validated-list/validated-list.component';
import { ResultFormComponent } from './modals/result-form/result-form.component';
import { EkasComponent } from './modals/ekas/ekas.component';
import { EpresComponent } from './modals/epres/epres.component';


@NgModule({
  declarations: [
    KonsultaComponent,
    ForValidationComponent,
    ValidatedListComponent,
    ResultFormComponent,
    EkasComponent,
    EpresComponent
  ],
  imports: [
    CommonModule,
    KonsultaRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class KonsultaModule { }
