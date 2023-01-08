import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyModalComponent } from './pregnancy-modal.component';

describe('PregnancyModalComponent', () => {
  let component: PregnancyModalComponent;
  let fixture: ComponentFixture<PregnancyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregnancyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
