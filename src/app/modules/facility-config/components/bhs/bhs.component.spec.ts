import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsComponent } from './bhs.component';

describe('BhsComponent', () => {
  let component: BhsComponent;
  let fixture: ComponentFixture<BhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
