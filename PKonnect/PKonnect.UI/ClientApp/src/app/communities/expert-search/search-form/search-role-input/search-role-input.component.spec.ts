import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoleInputComponent } from './search-role-input.component';

describe('SearchRoleInputComponent', () => {
  let component: SearchRoleInputComponent;
  let fixture: ComponentFixture<SearchRoleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRoleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
