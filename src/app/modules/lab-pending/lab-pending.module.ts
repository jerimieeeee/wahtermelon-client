import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabPendingRoutingModule } from './lab-pending-routing.module';
import { LabPendingComponent } from './lab-pending.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { LabFormComponent } from 'app/shared/shared-components/laboratory/lab-form/lab-form.component';


@NgModule({
  declarations: [
    LabPendingComponent
  ],
  imports: [
    CommonModule,
    LabPendingRoutingModule,
    FormsModule,
    FontAwesomeModule,
    DeleteItemComponent,
    LabFormComponent
  ]
})
export class LabPendingModule { }
