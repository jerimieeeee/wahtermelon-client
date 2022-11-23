import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalcareComponent } from './maternalcare.component';

describe('MaternalcareComponent', () => {
  let component: MaternalcareComponent;
  let fixture: ComponentFixture<MaternalcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaternalcareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternalcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
