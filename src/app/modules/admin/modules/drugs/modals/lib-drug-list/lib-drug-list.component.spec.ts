import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibDrugListComponent } from './lib-drug-list.component';

describe('LibDrugListComponent', () => {
  let component: LibDrugListComponent;
  let fixture: ComponentFixture<LibDrugListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibDrugListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibDrugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
