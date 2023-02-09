import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpresComponent } from './epres.component';

describe('EpresComponent', () => {
  let component: EpresComponent;
  let fixture: ComponentFixture<EpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
