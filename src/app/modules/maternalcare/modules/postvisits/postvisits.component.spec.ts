import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostvisitsComponent } from './postvisits.component';

describe('PostvisitsComponent', () => {
  let component: PostvisitsComponent;
  let fixture: ComponentFixture<PostvisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostvisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostvisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
