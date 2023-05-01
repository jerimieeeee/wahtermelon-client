import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugDispensingComponent } from './drug-dispensing.component';

const routes: Routes = [{ path: '', component: DrugDispensingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugDispensingRoutingModule { }
