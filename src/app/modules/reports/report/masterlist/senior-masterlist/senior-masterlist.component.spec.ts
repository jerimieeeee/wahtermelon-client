import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorMasterlistComponent } from './senior-masterlist.component';

describe('SeniorMasterlistComponent', () => {
  let component: SeniorMasterlistComponent;
  let fixture: ComponentFixture<SeniorMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeniorMasterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
