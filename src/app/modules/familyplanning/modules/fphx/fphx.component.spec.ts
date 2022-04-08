import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FphxComponent } from './fphx.component';

describe('FphxComponent', () => {
  let component: FphxComponent;
  let fixture: ComponentFixture<FphxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FphxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FphxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
