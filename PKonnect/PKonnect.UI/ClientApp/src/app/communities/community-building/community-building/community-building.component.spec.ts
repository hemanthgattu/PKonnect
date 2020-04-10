import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBuildingComponent } from './community-building.component';

describe('CommunityBuildingComponent', () => {
  let component: CommunityBuildingComponent;
  let fixture: ComponentFixture<CommunityBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
