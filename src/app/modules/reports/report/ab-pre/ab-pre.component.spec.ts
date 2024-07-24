import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbPreComponent } from './ab-pre.component';

describe('AbPreComponent', () => {
  let component: AbPreComponent;
  let fixture: ComponentFixture<AbPreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbPreComponent]
    });
    fixture = TestBed.createComponent(AbPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
