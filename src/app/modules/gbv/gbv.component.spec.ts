import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbvComponent } from './gbv.component';

describe('GbvComponent', () => {
  let component: GbvComponent;
  let fixture: ComponentFixture<GbvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GbvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GbvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
