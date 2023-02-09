import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalModalComponent } from './surgical-modal.component';

describe('SurgicalModalComponent', () => {
  let component: SurgicalModalComponent;
  let fixture: ComponentFixture<SurgicalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurgicalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
