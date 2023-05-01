import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalActionModalComponent } from './surgical-action-modal.component';

describe('SurgicalActionModalComponent', () => {
  let component: SurgicalActionModalComponent;
  let fixture: ComponentFixture<SurgicalActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgicalActionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurgicalActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
