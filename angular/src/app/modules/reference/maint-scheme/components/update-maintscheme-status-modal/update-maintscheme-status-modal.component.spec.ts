import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintschemeStatusModalComponent } from './update-maintscheme-status-modal.component';

describe('UpdateMaintschemeStatusModalComponent', () => {
  let component: UpdateMaintschemeStatusModalComponent;
  let fixture: ComponentFixture<UpdateMaintschemeStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMaintschemeStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaintschemeStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
