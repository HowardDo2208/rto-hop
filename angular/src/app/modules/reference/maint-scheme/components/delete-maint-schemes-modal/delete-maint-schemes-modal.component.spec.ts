import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintSchemesModalComponent } from './delete-maint-schemes-modal.component';

describe('DeleteMaintSchemesModalComponent', () => {
  let component: DeleteMaintSchemesModalComponent;
  let fixture: ComponentFixture<DeleteMaintSchemesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaintSchemesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMaintSchemesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
