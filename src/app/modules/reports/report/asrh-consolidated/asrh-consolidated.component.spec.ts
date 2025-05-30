import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrhConsolidatedComponent } from './asrh-consolidated.component';

describe('AsrhConsolidatedComponent', () => {
  let component: AsrhConsolidatedComponent;
  let fixture: ComponentFixture<AsrhConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrhConsolidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsrhConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
