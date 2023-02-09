import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilhealthModalComponent } from './philhealth-modal.component';

describe('PhilhealthModalComponent', () => {
  let component: PhilhealthModalComponent;
  let fixture: ComponentFixture<PhilhealthModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilhealthModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilhealthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
