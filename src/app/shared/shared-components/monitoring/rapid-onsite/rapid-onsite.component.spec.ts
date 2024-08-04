import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidOnsiteComponent } from './rapid-onsite.component';

describe('RapidOnsiteComponent', () => {
  let component: RapidOnsiteComponent;
  let fixture: ComponentFixture<RapidOnsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidOnsiteComponent]
    });
    fixture = TestBed.createComponent(RapidOnsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
