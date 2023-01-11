import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreghistComponent } from './preghist.component';

describe('PreghistComponent', () => {
  let component: PreghistComponent;
  let fixture: ComponentFixture<PreghistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreghistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreghistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
