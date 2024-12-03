import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalOhsConsolidatedComponent } from './dental-ohs-consolidated.component.ts.bak';

describe('DentalOhsConsolidatedComponent', () => {
  let component: DentalOhsConsolidatedComponent;
  let fixture: ComponentFixture<DentalOhsConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentalOhsConsolidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentalOhsConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
