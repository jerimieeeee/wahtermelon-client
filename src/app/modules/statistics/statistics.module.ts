import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HealthFinancingComponent } from './health-financing/health-financing.component';
import { TableauModule } from 'ngx-tableau';




@NgModule({
  declarations: [
    StatisticsComponent,
    HealthFinancingComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TableauModule
  ]
})
export class StatisticsModule { }
