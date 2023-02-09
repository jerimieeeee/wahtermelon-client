import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabConfigComponent } from './lab-config.component';

describe('LabConfigComponent', () => {
  let component: LabConfigComponent;
  let fixture: ComponentFixture<LabConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
