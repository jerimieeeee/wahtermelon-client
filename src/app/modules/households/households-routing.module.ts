import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseholdsComponent } from './households.component';

const routes: Routes = [{ path: '', component: HouseholdsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseholdsRoutingModule { }
