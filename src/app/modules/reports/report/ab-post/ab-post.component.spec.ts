import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbPostComponent } from './ab-post.component';

describe('AbPostComponent', () => {
  let component: AbPostComponent;
  let fixture: ComponentFixture<AbPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbPostComponent]
    });
    fixture = TestBed.createComponent(AbPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
