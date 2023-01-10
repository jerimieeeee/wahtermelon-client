import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineActionModalComponent } from './vaccine-action-modal.component';

describe('VaccineActionModalComponent', () => {
  let component: VaccineActionModalComponent;
  let fixture: ComponentFixture<VaccineActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineActionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
