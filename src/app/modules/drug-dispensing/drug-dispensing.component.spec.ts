import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDispensingComponent } from './drug-dispensing.component';

describe('DrugDispensingComponent', () => {
  let component: DrugDispensingComponent;
  let fixture: ComponentFixture<DrugDispensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugDispensingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
