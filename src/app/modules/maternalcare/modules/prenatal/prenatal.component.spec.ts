import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenatalComponent } from './prenatal.component';

describe('PrenatalComponent', () => {
  let component: PrenatalComponent;
  let fixture: ComponentFixture<PrenatalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenatalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
