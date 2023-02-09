import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesModalComponent } from './allergies-modal.component';

describe('AllergiesModalComponent', () => {
  let component: AllergiesModalComponent;
  let fixture: ComponentFixture<AllergiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergiesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
