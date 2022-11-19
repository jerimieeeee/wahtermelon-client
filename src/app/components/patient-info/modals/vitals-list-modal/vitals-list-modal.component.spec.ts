import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsListModalComponent } from './vitals-list-modal.component';

describe('VitalsListModalComponent', () => {
  let component: VitalsListModalComponent;
  let fixture: ComponentFixture<VitalsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
