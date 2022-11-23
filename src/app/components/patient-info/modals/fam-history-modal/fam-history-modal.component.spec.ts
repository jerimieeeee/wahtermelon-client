import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamHistoryModalComponent } from './fam-history-modal.component';

describe('FamHistoryModalComponent', () => {
  let component: FamHistoryModalComponent;
  let fixture: ComponentFixture<FamHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamHistoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
