import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintSchemeComponent } from './maint-scheme.component';

describe('MaintSchemeComponent', () => {
  let component: MaintSchemeComponent;
  let fixture: ComponentFixture<MaintSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
