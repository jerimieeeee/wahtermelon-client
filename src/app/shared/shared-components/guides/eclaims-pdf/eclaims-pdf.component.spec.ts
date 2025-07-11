import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EclaimsPdfComponent } from './eclaims-pdf.component';

describe('EclaimsPdfComponent', () => {
  let component: EclaimsPdfComponent;
  let fixture: ComponentFixture<EclaimsPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EclaimsPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EclaimsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
