import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabPendingComponent } from './lab-pending.component';

const routes: Routes = [{ path: '', component: LabPendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabPendingRoutingModule { }
