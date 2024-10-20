import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketingRoutingModule } from './ticketing-routing.module';
import { TicketingComponent } from './ticketing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TicketTransactionsComponent } from './components/ticket-transactions/ticket-transactions.component';
import { TicketingModalComponent } from "./components/ticketing-modal/ticketing-modal.component";

@NgModule({
  declarations: [
    TicketingComponent
  ],
  imports: [
    CommonModule,
    TicketingRoutingModule,
    FontAwesomeModule,
    TicketTransactionsComponent,
    TicketingModalComponent
]
})
export class TicketingModule { }
