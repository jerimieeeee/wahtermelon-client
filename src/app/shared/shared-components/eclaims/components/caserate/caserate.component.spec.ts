import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaserateComponent } from './caserate.component';

describe('CaserateComponent', () => {
  let component: CaserateComponent;
  let fixture: ComponentFixture<CaserateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CaserateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaserateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
