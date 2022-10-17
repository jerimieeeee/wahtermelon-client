import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeprosyComponent } from './leprosy.component';

const routes: Routes = [{ path: '', component: LeprosyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeprosyRoutingModule { }
