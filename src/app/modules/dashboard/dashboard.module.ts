import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TodaysConsultComponent } from '../dashboard/todays-consult/todays-consult.component';
import { TodaysStatsComponent } from '../dashboard/todays-stats/todays-stats.component'

@NgModule({
  declarations: [
    DashboardComponent,
    TodaysConsultComponent,
    TodaysStatsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
