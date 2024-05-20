import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFdxComponent } from './pending-fdx.component';

describe('PendingFdxComponent', () => {
  let component: PendingFdxComponent;
  let fixture: ComponentFixture<PendingFdxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingFdxComponent]
    });
    fixture = TestBed.createComponent(PendingFdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
