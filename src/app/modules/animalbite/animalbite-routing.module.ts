import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalbiteComponent } from './animalbite.component';

const routes: Routes = [{ path: '', component: AnimalbiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalbiteRoutingModule { }
