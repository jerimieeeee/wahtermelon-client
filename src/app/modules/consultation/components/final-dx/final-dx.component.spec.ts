import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDxComponent } from './final-dx.component';

describe('FinalDxComponent', () => {
  let component: FinalDxComponent;
  let fixture: ComponentFixture<FinalDxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalDxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalDxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
