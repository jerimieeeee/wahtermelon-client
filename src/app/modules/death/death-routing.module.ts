import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeathComponent } from './death.component';

const routes: Routes = [{ path: '', component: DeathComponent },]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathRoutingModule { }
