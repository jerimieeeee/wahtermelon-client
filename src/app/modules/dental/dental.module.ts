import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalRoutingModule } from './dental-routing.module';
import { DentalComponent } from './dental.component';
import { ToothConditionComponent } from './modals/tooth-condition/tooth-condition.component';
import { ToothServicesComponent } from './modals/tooth-services/tooth-services.component';
import { AdultChartComponent } from './components/adult-chart/adult-chart.component';
import { TempChartComponent } from './components/temp-chart/temp-chart.component';


@NgModule({
  declarations: [
    DentalComponent,
    AdultChartComponent,
    TempChartComponent,
    ToothConditionComponent,
    ToothServicesComponent,
  ],
  imports: [
    CommonModule,
    DentalRoutingModule
  ]
})
export class DentalModule { }
