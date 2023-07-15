import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GbvComponent } from './gbv.component';

const routes: Routes = [{ path: '', component: GbvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GbvRoutingModule { }
