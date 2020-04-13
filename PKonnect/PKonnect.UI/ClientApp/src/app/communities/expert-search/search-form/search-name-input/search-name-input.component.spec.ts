import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNameInputComponent } from './search-name-input.component';

describe('SearchNameInputComponent', () => {
  let component: SearchNameInputComponent;
  let fixture: ComponentFixture<SearchNameInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNameInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
