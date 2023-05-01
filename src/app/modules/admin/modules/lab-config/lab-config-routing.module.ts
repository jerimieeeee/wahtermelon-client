import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabConfigComponent } from './lab-config.component';

const routes: Routes = [{ path: '', component: LabConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabConfigRoutingModule { }
