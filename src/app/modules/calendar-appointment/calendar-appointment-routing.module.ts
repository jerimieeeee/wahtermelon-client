import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarAppointmentComponent } from './calendar-appointment.component';

const routes: Routes = [{ path: '', component: CalendarAppointmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarAppointmentRoutingModule { }
