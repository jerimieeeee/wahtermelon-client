import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchmentBhsComponent } from './catchment-bhs.component';

describe('CatchmentBhsComponent', () => {
  let component: CatchmentBhsComponent;
  let fixture: ComponentFixture<CatchmentBhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchmentBhsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchmentBhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
