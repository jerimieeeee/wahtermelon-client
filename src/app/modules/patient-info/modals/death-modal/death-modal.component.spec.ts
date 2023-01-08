import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathModalComponent } from './death-modal.component';

describe('DeathModalComponent', () => {
  let component: DeathModalComponent;
  let fixture: ComponentFixture<DeathModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
