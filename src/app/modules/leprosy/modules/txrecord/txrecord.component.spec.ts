import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxrecordComponent } from './txrecord.component';

describe('TxrecordComponent', () => {
  let component: TxrecordComponent;
  let fixture: ComponentFixture<TxrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxrecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
