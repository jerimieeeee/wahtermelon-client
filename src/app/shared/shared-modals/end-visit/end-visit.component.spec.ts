import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndVisitComponent } from './end-visit.component';

describe('EndVisitComponent', () => {
  let component: EndVisitComponent;
  let fixture: ComponentFixture<EndVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
