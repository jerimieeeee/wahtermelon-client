import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KonsultaComponent } from './konsulta.component';

const routes: Routes = [{ path: '', component: KonsultaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KonsultaRoutingModule { }
