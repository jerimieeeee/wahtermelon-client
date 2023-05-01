import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreghistModalComponent } from './preghist-modal.component';

describe('PreghistModalComponent', () => {
  let component: PreghistModalComponent;
  let fixture: ComponentFixture<PreghistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreghistModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreghistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
