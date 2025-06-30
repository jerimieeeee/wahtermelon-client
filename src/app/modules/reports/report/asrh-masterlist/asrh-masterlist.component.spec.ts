import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrhMasterlistComponent } from './asrh-masterlist.component';

describe('AsrhMasterlistComponent', () => {
  let component: AsrhMasterlistComponent;
  let fixture: ComponentFixture<AsrhMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsrhMasterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsrhMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
