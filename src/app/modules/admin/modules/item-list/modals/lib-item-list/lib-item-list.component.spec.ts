import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibItemListComponent } from './lib-item-list.component';

describe('LibItemListComponent', () => {
  let component: LibItemListComponent;
  let fixture: ComponentFixture<LibItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
