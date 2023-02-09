import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMedicalComponent } from './past-medical.component';

describe('PastMedicalComponent', () => {
  let component: PastMedicalComponent;
  let fixture: ComponentFixture<PastMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastMedicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
