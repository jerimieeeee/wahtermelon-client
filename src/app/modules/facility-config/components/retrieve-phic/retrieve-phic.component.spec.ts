import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePhicComponent } from './retrieve-phic.component';

describe('RetrievePhicComponent', () => {
  let component: RetrievePhicComponent;
  let fixture: ComponentFixture<RetrievePhicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrievePhicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrievePhicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
