import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCaserateComponent } from './search-caserate.component';

describe('SearchCaserateComponent', () => {
  let component: SearchCaserateComponent;
  let fixture: ComponentFixture<SearchCaserateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchCaserateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCaserateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
