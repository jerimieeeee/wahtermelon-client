import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentalComponent } from './environmental.component';

const routes: Routes = [{ path: '', component: EnvironmentalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentalRoutingModule { }
