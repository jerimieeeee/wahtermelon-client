import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyplanningComponent } from './familyplanning.component';

describe('FamilyplanningComponent', () => {
  let component: FamilyplanningComponent;
  let fixture: ComponentFixture<FamilyplanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyplanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
