import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbdotsComponent } from './tbdots.component';

describe('TbdotsComponent', () => {
  let component: TbdotsComponent;
  let fixture: ComponentFixture<TbdotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbdotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbdotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
