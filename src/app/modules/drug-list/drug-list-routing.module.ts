import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugListComponent } from './drug-list.component';

const routes: Routes = [{ path: '', component: DrugListComponent },]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugListRoutingModule { }
