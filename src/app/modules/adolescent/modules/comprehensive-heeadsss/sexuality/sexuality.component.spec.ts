import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualityComponent } from './sexuality.component';

describe('SexualityComponent', () => {
  let component: SexualityComponent;
  let fixture: ComponentFixture<SexualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
