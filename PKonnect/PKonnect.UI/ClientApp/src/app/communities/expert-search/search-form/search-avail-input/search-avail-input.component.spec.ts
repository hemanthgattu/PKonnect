import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvailInputComponent } from './search-avail-input.component';

describe('SearchAvailInputComponent', () => {
  let component: SearchAvailInputComponent;
  let fixture: ComponentFixture<SearchAvailInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAvailInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAvailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
