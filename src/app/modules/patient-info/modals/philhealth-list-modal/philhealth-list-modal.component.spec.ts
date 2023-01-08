import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilhealthListModalComponent } from './philhealth-list-modal.component';

describe('PhilhealthListModalComponent', () => {
  let component: PhilhealthListModalComponent;
  let fixture: ComponentFixture<PhilhealthListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilhealthListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilhealthListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
