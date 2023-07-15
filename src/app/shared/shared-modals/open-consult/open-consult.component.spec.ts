import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConsultComponent } from './open-consult.component';

describe('OpenConsultComponent', () => {
  let component: OpenConsultComponent;
  let fixture: ComponentFixture<OpenConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OpenConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
