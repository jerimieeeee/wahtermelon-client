import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EclaimsComponent } from './eclaims.component';

const routes: Routes = [{ path: '', component: EclaimsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EclaimsRoutingModule { }
