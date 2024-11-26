import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdolescentRoutingModule } from './adolescent-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdolescentComponent } from './adolescent.component';
import { RapidHeeadsssComponent } from './modules/rapid-heeadsss/rapid-heeadsss.component';



@NgModule({
  declarations: [
    AdolescentComponent, RapidHeeadsssComponent
  ],
  imports: [
    CommonModule, AdolescentRoutingModule,FontAwesomeModule
  ]
})
export class AdolescentModule { }
