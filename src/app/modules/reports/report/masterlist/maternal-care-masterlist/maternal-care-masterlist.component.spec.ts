import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalCareMasterlistComponent } from './maternal-care-masterlist.component';

describe('MaternalCareMasterlistComponent', () => {
  let component: MaternalCareMasterlistComponent;
  let fixture: ComponentFixture<MaternalCareMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaternalCareMasterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaternalCareMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
