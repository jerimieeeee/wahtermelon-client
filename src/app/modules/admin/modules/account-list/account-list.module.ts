import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountListRoutingModule } from './account-list-routing.module';
import { AccountListComponent } from './account-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountListComponent
  ],
  imports: [
    CommonModule,
    AccountListRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AccountListModule { }
