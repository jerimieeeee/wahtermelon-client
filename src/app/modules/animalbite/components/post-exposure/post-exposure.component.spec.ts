import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExposureComponent } from './post-exposure.component';

describe('PostExposureComponent', () => {
  let component: PostExposureComponent;
  let fixture: ComponentFixture<PostExposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostExposureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
