import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHeroComponent } from './employee-hero.component';

describe('EmployeeHeroComponent', () => {
  let component: EmployeeHeroComponent;
  let fixture: ComponentFixture<EmployeeHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
