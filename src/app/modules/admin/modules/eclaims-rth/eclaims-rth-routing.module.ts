import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EclaimsRthComponent } from './eclaims-rth.component';

const routes: Routes = [{ path: '', component: EclaimsRthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EclaimsRthRoutingModule { }
