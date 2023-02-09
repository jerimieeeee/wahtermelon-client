import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbefComponent } from './pbef.component';

describe('PbefComponent', () => {
  let component: PbefComponent;
  let fixture: ComponentFixture<PbefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PbefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
