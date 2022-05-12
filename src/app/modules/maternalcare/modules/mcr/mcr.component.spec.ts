import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McrComponent } from './mcr.component';

describe('McrComponent', () => {
  let component: McrComponent;
  let fixture: ComponentFixture<McrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
