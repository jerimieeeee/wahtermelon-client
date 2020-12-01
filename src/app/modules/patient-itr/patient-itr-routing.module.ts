import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientItrComponent } from './patient-itr.component';

const routes: Routes = [{ path: '', component: PatientItrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientItrRoutingModule { }
