import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkillInputComponent } from './search-skill-input.component';

describe('SearchSkillInputComponent', () => {
  let component: SearchSkillInputComponent;
  let fixture: ComponentFixture<SearchSkillInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkillInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSkillInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
