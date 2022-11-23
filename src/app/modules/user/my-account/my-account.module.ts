import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class MyAccountModule { }
