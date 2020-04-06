import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchResultsComponent } from './employee-search-results.component';

describe('EmployeeSearchResultsComponent', () => {
  let component: EmployeeSearchResultsComponent;
  let fixture: ComponentFixture<EmployeeSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
