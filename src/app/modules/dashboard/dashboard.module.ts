import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TodaysConsultComponent } from '../dashboard/todays-consult/todays-consult.component';
import { TodaysStatsComponent } from '../dashboard/todays-stats/todays-stats.component'
import { FormsModule } from '@angular/forms';
import { TodaysAppointmentComponent } from './todays-appointment/todays-appointment.component';
import { TodaysReferralComponent } from './todays-referral/todays-referral.component';
import { GbvPatientsComponent } from './gbv-patients/gbv-patients.component';
import { PendingFdxComponent } from './pending-fdx/pending-fdx.component';
import { FinalDxComponent } from './pending-fdx/modals/final-dx/final-dx.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TodaysConsultComponent,
    TodaysStatsComponent,
    TodaysAppointmentComponent,
    TodaysReferralComponent,
    GbvPatientsComponent,
    PendingFdxComponent,
    FinalDxComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class DashboardModule { }
