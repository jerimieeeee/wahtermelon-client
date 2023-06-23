import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchmentBarangayComponent } from './catchment-barangay.component';

describe('CatchmentBarangayComponent', () => {
  let component: CatchmentBarangayComponent;
  let fixture: ComponentFixture<CatchmentBarangayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchmentBarangayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchmentBarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
