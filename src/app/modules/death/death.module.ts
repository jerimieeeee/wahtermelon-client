import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeathComponent } from './death.component';
import { DeathRoutingModule } from './death-routing.module';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeathRecordComponent } from './components/death-record/death-record.component';


@NgModule({
  declarations: [DeathComponent, DeathRecordComponent],
  imports: [
    CommonModule,
    DeathRoutingModule,SharedComponentsModule,FontAwesomeModule
  ]
})
export class DeathModule { }
