import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseActsComponent } from './abuse-acts.component';

describe('AbuseActsComponent', () => {
  let component: AbuseActsComponent;
  let fixture: ComponentFixture<AbuseActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseActsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbuseActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
