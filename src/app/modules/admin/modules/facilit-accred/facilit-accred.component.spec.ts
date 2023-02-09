import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitAccredComponent } from './facilit-accred.component';

describe('FacilitAccredComponent', () => {
  let component: FacilitAccredComponent;
  let fixture: ComponentFixture<FacilitAccredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitAccredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitAccredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
