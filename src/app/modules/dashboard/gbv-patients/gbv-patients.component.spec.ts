import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbvPatientsComponent } from './gbv-patients.component';

describe('GbvPatientsComponent', () => {
  let component: GbvPatientsComponent;
  let fixture: ComponentFixture<GbvPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GbvPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GbvPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
