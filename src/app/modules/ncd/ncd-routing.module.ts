import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NcdComponent } from './ncd.component';

const routes: Routes = [{ path: '', component: NcdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NcdRoutingModule { }
