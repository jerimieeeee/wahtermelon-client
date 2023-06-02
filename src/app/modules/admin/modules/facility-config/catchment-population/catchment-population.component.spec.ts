import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchmentPopulationComponent } from './catchment-population.component';

describe('CatchmentPopulationComponent', () => {
  let component: CatchmentPopulationComponent;
  let fixture: ComponentFixture<CatchmentPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchmentPopulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchmentPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
