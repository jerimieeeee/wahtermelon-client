import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaternalcareComponent } from './maternalcare.component';

const routes: Routes = [{ path: '', component: MaternalcareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaternalcareRoutingModule { }
