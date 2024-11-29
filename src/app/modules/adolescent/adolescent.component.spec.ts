import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdolescentComponent } from './adolescent.component';

describe('AdolescentComponent', () => {
  let component: AdolescentComponent;
  let fixture: ComponentFixture<AdolescentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdolescentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdolescentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
