import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpchartModalComponent } from './fpchart-modal.component';

describe('FpchartModalComponent', () => {
  let component: FpchartModalComponent;
  let fixture: ComponentFixture<FpchartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpchartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpchartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
