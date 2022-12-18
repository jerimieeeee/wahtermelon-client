import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsultaComponent } from './konsulta.component';

describe('KonsultaComponent', () => {
  let component: KonsultaComponent;
  let fixture: ComponentFixture<KonsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
