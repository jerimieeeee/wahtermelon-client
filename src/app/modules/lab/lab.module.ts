import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabFormComponent } from './components/lab-form/lab-form.component';
import { LabDeleteComponent } from './components/lab-delete/lab-delete.component';


@NgModule({
  declarations: [
    LabComponent,
    LabFormComponent,
    LabDeleteComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule
  ]
})
export class LabModule { }
