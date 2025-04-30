import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsoaComponent } from './esoa.component';

describe('EsoaComponent', () => {
  let component: EsoaComponent;
  let fixture: ComponentFixture<EsoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
