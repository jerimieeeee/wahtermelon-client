import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRthClaimComponent } from './add-new-rth-claim.component';

describe('AddNewRthClaimComponent', () => {
  let component: AddNewRthClaimComponent;
  let fixture: ComponentFixture<AddNewRthClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewRthClaimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRthClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
