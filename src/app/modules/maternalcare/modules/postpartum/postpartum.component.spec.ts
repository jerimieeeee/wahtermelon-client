import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpartumComponent } from './postpartum.component';

describe('PostpartumComponent', () => {
  let component: PostpartumComponent;
  let fixture: ComponentFixture<PostpartumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostpartumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpartumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
