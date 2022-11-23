import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieComponent } from './phie.component';

describe('PhieComponent', () => {
  let component: PhieComponent;
  let fixture: ComponentFixture<PhieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
