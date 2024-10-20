import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketingComponent } from './ticketing.component';

const routes: Routes = [{ path: '', component: TicketingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketingRoutingModule { }
