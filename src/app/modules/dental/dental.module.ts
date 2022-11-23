import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalRoutingModule } from './dental-routing.module';
import { DentalComponent } from './dental.component';
import { ToothConditionComponent } from './modals/tooth-condition/tooth-condition.component';
import { ToothServicesComponent } from './modals/tooth-services/tooth-services.component';
import { AdultChartComponent } from './components/chart-adult/chart-adult.component';
import { TempChartComponent } from './components/chart-temp/chart-temp.component';
import { HistoryComponent } from './components/history/history.component';
import { ConditionComponent } from './components/condition/condition.component';
import { ServicesComponent } from './components/services/services.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DentalComponent,
    AdultChartComponent,
    TempChartComponent,
    ToothConditionComponent,
    ToothServicesComponent,
    HistoryComponent,
    ConditionComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    DentalRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule
  ]
})
export class DentalModule { }
