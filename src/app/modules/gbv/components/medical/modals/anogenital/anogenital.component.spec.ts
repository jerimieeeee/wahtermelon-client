import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnogenitalComponent } from './anogenital.component';

describe('AnogenitalComponent', () => {
  let component: AnogenitalComponent;
  let fixture: ComponentFixture<AnogenitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnogenitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnogenitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
