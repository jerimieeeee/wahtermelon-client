import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkasComponent } from './ekas.component';

describe('EkasComponent', () => {
  let component: EkasComponent;
  let fixture: ComponentFixture<EkasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
