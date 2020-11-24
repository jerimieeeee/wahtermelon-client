import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TodaysConsultComponent } from '../../components/todays-consult/todays-consult.component';
import { TodaysStatComponent } from '../../components/todays-stat/todays-stat.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TodaysConsultComponent,
    TodaysStatComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
