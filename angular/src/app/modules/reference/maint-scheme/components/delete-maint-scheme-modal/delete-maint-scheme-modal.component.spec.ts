import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintSchemeModalComponent } from './delete-maint-scheme-modal.component';

describe('DeleteMaintSchemeModalComponent', () => {
  let component: DeleteMaintSchemeModalComponent;
  let fixture: ComponentFixture<DeleteMaintSchemeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaintSchemeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMaintSchemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
