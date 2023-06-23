import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCompositionComponent } from './family-composition.component';

describe('FamilyCompositionComponent', () => {
  let component: FamilyCompositionComponent;
  let fixture: ComponentFixture<FamilyCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyCompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
