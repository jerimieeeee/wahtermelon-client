import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDeleteComponent } from './lab-delete.component';

describe('LabDeleteComponent', () => {
  let component: LabDeleteComponent;
  let fixture: ComponentFixture<LabDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
