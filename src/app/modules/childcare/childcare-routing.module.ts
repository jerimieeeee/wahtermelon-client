import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildcareComponent } from './childcare.component';

const routes: Routes = [{ path: '', component: ChildcareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildcareRoutingModule { }
