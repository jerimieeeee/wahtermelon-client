import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdolescentComponent } from './adolescent.component';

const routes: Routes = [{ path: '', component: AdolescentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdolescentRoutingModule { }
