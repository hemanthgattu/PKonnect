import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSkillsComponent } from './employee-skills.component';

describe('EmployeeSkillsComponent', () => {
  let component: EmployeeSkillsComponent;
  let fixture: ComponentFixture<EmployeeSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
