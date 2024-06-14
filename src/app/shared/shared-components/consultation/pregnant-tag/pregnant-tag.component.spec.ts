import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantTagComponent } from './pregnant-tag.component';

describe('PregnantTagComponent', () => {
  let component: PregnantTagComponent;
  let fixture: ComponentFixture<PregnantTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnantTagComponent]
    });
    fixture = TestBed.createComponent(PregnantTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
