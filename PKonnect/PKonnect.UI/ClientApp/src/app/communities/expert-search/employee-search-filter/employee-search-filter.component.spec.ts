import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchFilterComponent } from './employee-search-filter.component';

describe('EmployeeSearchFilterComponent', () => {
  let component: EmployeeSearchFilterComponent;
  let fixture: ComponentFixture<EmployeeSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
