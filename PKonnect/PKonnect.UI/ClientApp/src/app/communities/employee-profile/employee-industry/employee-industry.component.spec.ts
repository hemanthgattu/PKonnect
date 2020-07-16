import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIndustryComponent } from './employee-industry.component';

describe('EmployeeIndustryComponent', () => {
  let component: EmployeeIndustryComponent;
  let fixture: ComponentFixture<EmployeeIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
