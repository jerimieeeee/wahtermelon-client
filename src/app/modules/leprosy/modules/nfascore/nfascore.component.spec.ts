import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfascoreComponent } from './nfascore.component';

describe('NfascoreComponent', () => {
  let component: NfascoreComponent;
  let fixture: ComponentFixture<NfascoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfascoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfascoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
