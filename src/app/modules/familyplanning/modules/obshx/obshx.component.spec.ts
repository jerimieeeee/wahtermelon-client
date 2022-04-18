import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObshxComponent } from './obshx.component';

describe('ObshxComponent', () => {
  let component: ObshxComponent;
  let fixture: ComponentFixture<ObshxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObshxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObshxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
