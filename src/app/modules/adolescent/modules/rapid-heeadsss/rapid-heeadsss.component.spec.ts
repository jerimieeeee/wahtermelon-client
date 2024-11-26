import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidHeeadsssComponent } from './rapid-heeadsss.component';

describe('RapidHeeadsssComponent', () => {
  let component: RapidHeeadsssComponent;
  let fixture: ComponentFixture<RapidHeeadsssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapidHeeadsssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapidHeeadsssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
