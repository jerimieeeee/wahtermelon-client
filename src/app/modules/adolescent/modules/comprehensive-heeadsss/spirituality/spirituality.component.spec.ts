import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritualityComponent } from './spirituality.component';

describe('SpiritualityComponent', () => {
  let component: SpiritualityComponent;
  let fixture: ComponentFixture<SpiritualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiritualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiritualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
