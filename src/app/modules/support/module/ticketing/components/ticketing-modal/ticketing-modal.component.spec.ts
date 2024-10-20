import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingModalComponent } from './ticketing-modal.component';

describe('TicketingModalComponent', () => {
  let component: TicketingModalComponent;
  let fixture: ComponentFixture<TicketingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketingModalComponent]
    });
    fixture = TestBed.createComponent(TicketingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
