import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalbiteComponent } from './animalbite.component';

describe('AnimalbiteComponent', () => {
  let component: AnimalbiteComponent;
  let fixture: ComponentFixture<AnimalbiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalbiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalbiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
