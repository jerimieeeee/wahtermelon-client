import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicideDepressionComponent } from './suicide-depression.component';

describe('SuicideDepressionComponent', () => {
  let component: SuicideDepressionComponent;
  let fixture: ComponentFixture<SuicideDepressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuicideDepressionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuicideDepressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
