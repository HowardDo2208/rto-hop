import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintSchemeModalComponent } from './edit-maint-scheme-modal.component';

describe('EditMaintSchemeModalComponent', () => {
  let component: EditMaintSchemeModalComponent;
  let fixture: ComponentFixture<EditMaintSchemeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaintSchemeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintSchemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
