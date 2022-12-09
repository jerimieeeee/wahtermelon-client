import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPromptComponent } from './alert-prompt.component';

describe('AlertPromptComponent', () => {
  let component: AlertPromptComponent;
  let fixture: ComponentFixture<AlertPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
