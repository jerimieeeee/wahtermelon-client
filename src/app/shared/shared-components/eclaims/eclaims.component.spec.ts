import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EclaimsComponent } from './eclaims.component';

describe('EclaimsComponent', () => {
  let component: EclaimsComponent;
  let fixture: ComponentFixture<EclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EclaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
