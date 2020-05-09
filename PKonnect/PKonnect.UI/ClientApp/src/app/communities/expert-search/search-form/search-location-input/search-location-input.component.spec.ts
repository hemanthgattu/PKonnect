import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationInputComponent } from './search-location-input.component';

describe('SearchLocationInputComponent', () => {
  let component: SearchLocationInputComponent;
  let fixture: ComponentFixture<SearchLocationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLocationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
