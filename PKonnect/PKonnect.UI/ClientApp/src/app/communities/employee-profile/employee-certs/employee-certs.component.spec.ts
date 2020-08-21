import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCertsComponent } from './employee-certs.component';

describe('EmployeeCertsComponent', () => {
  let component: EmployeeCertsComponent;
  let fixture: ComponentFixture<EmployeeCertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
