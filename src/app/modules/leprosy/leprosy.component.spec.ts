import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeprosyComponent } from './leprosy.component';

describe('LeprosyComponent', () => {
  let component: LeprosyComponent;
  let fixture: ComponentFixture<LeprosyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeprosyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeprosyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
