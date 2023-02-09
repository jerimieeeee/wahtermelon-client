import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsultaMasterlistComponent } from './konsulta-masterlist.component';

describe('KonsultaMasterlistComponent', () => {
  let component: KonsultaMasterlistComponent;
  let fixture: ComponentFixture<KonsultaMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonsultaMasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonsultaMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
