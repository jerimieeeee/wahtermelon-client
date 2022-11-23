import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothServicesComponent } from './tooth-services.component';

describe('ToothServicesComponent', () => {
  let component: ToothServicesComponent;
  let fixture: ComponentFixture<ToothServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
