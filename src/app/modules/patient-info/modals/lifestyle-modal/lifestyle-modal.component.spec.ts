import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleModalComponent } from './lifestyle-modal.component';

describe('LifestyleModalComponent', () => {
  let component: LifestyleModalComponent;
  let fixture: ComponentFixture<LifestyleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifestyleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifestyleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
