import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingComponent } from './eating.component';

describe('EatingComponent', () => {
  let component: EatingComponent;
  let fixture: ComponentFixture<EatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
