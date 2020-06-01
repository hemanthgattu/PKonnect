import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCertificationInputComponent } from './search-certification-input.component';

describe('SearchCertificationInputComponent', () => {
  let component: SearchCertificationInputComponent;
  let fixture: ComponentFixture<SearchCertificationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCertificationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCertificationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
