import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyHistoryComponent } from './pregnancy-history.component';

describe('PregnancyHistoryComponent', () => {
  let component: PregnancyHistoryComponent;
  let fixture: ComponentFixture<PregnancyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregnancyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
