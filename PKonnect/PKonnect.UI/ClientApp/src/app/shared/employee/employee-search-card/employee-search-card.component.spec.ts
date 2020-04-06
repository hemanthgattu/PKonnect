import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchCardComponent } from './employee-search-card.component';

describe('EmployeeSearchCardComponent', () => {
  let component: EmployeeSearchCardComponent;
  let fixture: ComponentFixture<EmployeeSearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSearchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
