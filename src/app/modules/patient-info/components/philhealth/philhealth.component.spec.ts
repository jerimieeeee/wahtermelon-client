import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilhealthComponent } from './philhealth.component';

describe('PhilhealthComponent', () => {
  let component: PhilhealthComponent;
  let fixture: ComponentFixture<PhilhealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilhealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
