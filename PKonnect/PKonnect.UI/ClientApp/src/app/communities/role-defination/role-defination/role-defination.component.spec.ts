import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDefinationComponent } from './role-defination.component';

describe('RoleDefinationComponent', () => {
  let component: RoleDefinationComponent;
  let fixture: ComponentFixture<RoleDefinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDefinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
