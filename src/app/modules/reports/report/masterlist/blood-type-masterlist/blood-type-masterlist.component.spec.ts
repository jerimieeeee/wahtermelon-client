import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypeMasterlistComponent } from './blood-type-masterlist.component';

describe('BloodTypeMasterlistComponent', () => {
  let component: BloodTypeMasterlistComponent;
  let fixture: ComponentFixture<BloodTypeMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodTypeMasterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodTypeMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
