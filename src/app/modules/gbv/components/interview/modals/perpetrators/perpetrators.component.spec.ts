import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpetratorsComponent } from './perpetrators.component';

describe('PerpetratorsComponent', () => {
  let component: PerpetratorsComponent;
  let fixture: ComponentFixture<PerpetratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpetratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerpetratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
