import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanRabiesComponent } from './human-rabies.component';

describe('HumanRabiesComponent', () => {
  let component: HumanRabiesComponent;
  let fixture: ComponentFixture<HumanRabiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanRabiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanRabiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
