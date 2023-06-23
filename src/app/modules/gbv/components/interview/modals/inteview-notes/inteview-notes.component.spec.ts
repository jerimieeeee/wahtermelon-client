import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteviewNotesComponent } from './inteview-notes.component';

describe('InteviewNotesComponent', () => {
  let component: InteviewNotesComponent;
  let fixture: ComponentFixture<InteviewNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteviewNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteviewNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
