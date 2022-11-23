import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmtestComponent } from './vmtest.component';

describe('VmtestComponent', () => {
  let component: VmtestComponent;
  let fixture: ComponentFixture<VmtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmtestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
