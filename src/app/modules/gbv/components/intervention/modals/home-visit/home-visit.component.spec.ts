import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVisitComponent } from './home-visit.component';

describe('HomeVisitComponent', () => {
  let component: HomeVisitComponent;
  let fixture: ComponentFixture<HomeVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
