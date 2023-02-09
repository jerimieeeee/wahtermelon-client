import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedListComponent } from './validated-list.component';

describe('ValidatedListComponent', () => {
  let component: ValidatedListComponent;
  let fixture: ComponentFixture<ValidatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
