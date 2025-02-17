import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedComponent } from './consolidated.component';

describe('ConsolidatedComponent', () => {
  let component: ConsolidatedComponent;
  let fixture: ComponentFixture<ConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
