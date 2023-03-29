import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentArchiveComponent } from './treatment-archive.component';

describe('TreatmentArchiveComponent', () => {
  let component: TreatmentArchiveComponent;
  let fixture: ComponentFixture<TreatmentArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
