import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanningMasterlistComponent } from './family-planning-masterlist.component';

describe('FamilyPlanningMasterlistComponent', () => {
  let component: FamilyPlanningMasterlistComponent;
  let fixture: ComponentFixture<FamilyPlanningMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyPlanningMasterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyPlanningMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
