import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilityaccreditationComponent } from './facilityaccreditation.component';

const routes: Routes =  [{ path: '', component: FacilityaccreditationComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityaccreditationRoutingModule { }
