import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbOutcomeComponent } from './ab-outcome.component';

describe('AbOutcomeComponent', () => {
  let component: AbOutcomeComponent;
  let fixture: ComponentFixture<AbOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
