import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenstrualModalComponent } from './menstrual-modal.component';

describe('MenstrualModalComponent', () => {
  let component: MenstrualModalComponent;
  let fixture: ComponentFixture<MenstrualModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenstrualModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenstrualModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
