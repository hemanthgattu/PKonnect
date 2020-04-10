import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocAutoCompleteComponent } from './poc-auto-complete.component';

describe('PocAutoCompleteComponent', () => {
  let component: PocAutoCompleteComponent;
  let fixture: ComponentFixture<PocAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
