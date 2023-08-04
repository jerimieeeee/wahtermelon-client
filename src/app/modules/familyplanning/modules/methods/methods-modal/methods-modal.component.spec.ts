import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsModalComponent } from './methods-modal.component';

describe('MethodsModalComponent', () => {
  let component: MethodsModalComponent;
  let fixture: ComponentFixture<MethodsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
