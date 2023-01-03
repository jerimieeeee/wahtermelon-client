import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcdComponent } from './ncd.component';

describe('NcdComponent', () => {
  let component: NcdComponent;
  let fixture: ComponentFixture<NcdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
