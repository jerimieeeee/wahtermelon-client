import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNameListComponent } from './show-name-list.component';

describe('ShowNameListComponent', () => {
  let component: ShowNameListComponent;
  let fixture: ComponentFixture<ShowNameListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowNameListComponent]
    });
    fixture = TestBed.createComponent(ShowNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
