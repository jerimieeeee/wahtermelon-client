import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterServiceComponent } from './toaster-service.component';

describe('ToasterServiceComponent', () => {
  let component: ToasterServiceComponent;
  let fixture: ComponentFixture<ToasterServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToasterServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToasterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
