import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTransactionsComponent } from './ticket-transactions.component';

describe('TicketTransactionsComponent', () => {
  let component: TicketTransactionsComponent;
  let fixture: ComponentFixture<TicketTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketTransactionsComponent]
    });
    fixture = TestBed.createComponent(TicketTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
