import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyplanningComponent } from './familyplanning.component';

const routes: Routes = [{ path: '', component: FamilyplanningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyplanningRoutingModule { }
