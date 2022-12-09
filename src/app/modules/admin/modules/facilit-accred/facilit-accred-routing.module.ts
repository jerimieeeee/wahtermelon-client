import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilitAccredComponent } from './facilit-accred.component';

const routes: Routes = [{ path: '', component: FacilitAccredComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitAccredRoutingModule { }
