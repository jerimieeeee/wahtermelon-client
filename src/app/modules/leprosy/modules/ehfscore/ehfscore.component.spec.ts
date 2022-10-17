import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhfscoreComponent } from './ehfscore.component';

describe('EhfscoreComponent', () => {
  let component: EhfscoreComponent;
  let fixture: ComponentFixture<EhfscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EhfscoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EhfscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
