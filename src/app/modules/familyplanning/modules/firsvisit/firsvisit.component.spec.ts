import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsvisitComponent } from './firsvisit.component';

describe('FirsvisitComponent', () => {
  let component: FirsvisitComponent;
  let fixture: ComponentFixture<FirsvisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirsvisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
