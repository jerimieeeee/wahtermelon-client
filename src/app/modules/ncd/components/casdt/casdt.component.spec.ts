import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasdtComponent } from './casdt.component';

describe('CasdtComponent', () => {
  let component: CasdtComponent;
  let fixture: ComponentFixture<CasdtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasdtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
