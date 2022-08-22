import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TbdotsComponent } from './tbdots.component';

const routes: Routes = [{ path: '', component: TbdotsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TbdotsRoutingModule { }
