import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyFolderModalComponent } from './family-folder-modal.component';

describe('FamilyFolderModalComponent', () => {
  let component: FamilyFolderModalComponent;
  let fixture: ComponentFixture<FamilyFolderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyFolderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
