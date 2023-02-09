import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForValidationComponent } from './for-validation.component';

describe('ForValidationComponent', () => {
  let component: ForValidationComponent;
  let fixture: ComponentFixture<ForValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
