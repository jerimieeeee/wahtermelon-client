import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatePregnancyComponent } from './terminate-pregnancy.component';

describe('TerminatePregnancyComponent', () => {
  let component: TerminatePregnancyComponent;
  let fixture: ComponentFixture<TerminatePregnancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminatePregnancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminatePregnancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
