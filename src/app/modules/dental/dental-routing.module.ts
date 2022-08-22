import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentalComponent } from './dental.component';

const routes: Routes = [{ path: '', component: DentalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentalRoutingModule { }
