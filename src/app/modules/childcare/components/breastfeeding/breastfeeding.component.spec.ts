import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastfeedingComponent } from './breastfeeding.component';

describe('BreastfeedingComponent', () => {
  let component: BreastfeedingComponent;
  let fixture: ComponentFixture<BreastfeedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreastfeedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastfeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
