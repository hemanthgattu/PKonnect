import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';

@Component({
  selector: 'app-employee-search-filter',
  templateUrl: './employee-search-filter.component.html',
  styleUrls: ['./employee-search-filter.component.scss']
})
export class EmployeeSearchFilterComponent implements OnInit {

  public isMobile = false;
  public toggleSearchForm = false;
  private resizeTimeout: any;
  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria;
  public searchSkills = [];
  @Output() public employeeResponseEvent = new EventEmitter();
  public searchResponse = [
    {
      id: 1,
      firstName: 'Datta',
      lastName: 'Gunturu',
      fullName: 'Datta Gunturu',
      gender: 'Male',
      city: 'Omaha',
      state: 'NE',
      zipCode: 68116,
      country: 'USA',
      primaryEmailAddress: 'Gdattarajesh@pkglobal.com',
      secondaryEmailAddress: null,
      recordType: null,
      reportsTo: 'Sridhar',
      employeeID: 'ES000368',
      category: null,
      siteCity: 'Omaha',
      siteState: 'NE',
      employeeStatus: 'Available',
      experienceInYears: 11,
      employeeType: 'Full time',
      employeeCountry: 'USA',
      primarySkill: 'Microsoft Technologies',
      title: null,
      serviceLine: null,
      modifiedDate: '2020-04-01T21:23:49.8666667+00:00',
      createdDate: '2020-04-01T21:23:49.8666667+00:00',
      isActive: true
    },
    {
      id: 3,
      firstName: 'Datta',
      lastName: 'Gunturu',
      fullName: 'Datta Gunturu',
      gender: 'Male',
      city: 'Omaha',
      state: 'NE',
      zipCode: 68116,
      country: 'USA',
      primaryEmailAddress: 'Gdattarajesh@pkglobal.com',
      secondaryEmailAddress: null,
      recordType: null,
      reportsTo: 'Sridhar',
      employeeID: 'ES000368',
      category: null,
      siteCity: 'Omaha',
      siteState: 'NE',
      employeeStatus: 'Available',
      experienceInYears: 11,
      employeeType: 'Full time',
      employeeCountry: 'USA',
      primarySkill: 'Microsoft Technologies',
      title: null,
      serviceLine: null,
      modifiedDate: '2020-04-01T21:23:49.8666667+00:00',
      createdDate: '2020-04-01T21:23:49.8666667+00:00',
      isActive: true
    },
    {
      id: 2,
      firstName: 'Datta',
      lastName: 'Gunturu',
      fullName: 'Datta Gunturu',
      gender: 'Male',
      city: 'Omaha',
      state: 'NE',
      zipCode: 68116,
      country: 'USA',
      primaryEmailAddress: 'Gdattarajesh@pkglobal.com',
      secondaryEmailAddress: null,
      recordType: null,
      reportsTo: 'Sridhar',
      employeeID: 'ES000368',
      category: null,
      siteCity: 'Omaha',
      siteState: 'NE',
      employeeStatus: 'Available',
      experienceInYears: 11,
      employeeType: 'Full time',
      employeeCountry: 'USA',
      primarySkill: 'Microsoft Technologies',
      title: null,
      serviceLine: null,
      modifiedDate: '2020-04-01T21:23:49.8666667+00:00',
      createdDate: '2020-04-01T21:23:49.8666667+00:00',
      isActive: true
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();
  }

  // Check width of the screen
  checkWidth(): boolean {
    return window.innerWidth < this.mobileWidth ? true : false;
  }

  // Checks width of the screen when screen re-size
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.isMobile = this.checkWidth();
    }).bind(this), 500);
  }

  // Mobile view - Toggle search form when clicked on filter button
  toggleSearch(): void {
    this.toggleSearchForm = !this.toggleSearchForm;
  }

  // On Submit Filter Results
  searchEmployees(searchCriteria: SearchCriteria): void {
    this.toggleSearchForm = false;
    this.searchEmployeesRequest = searchCriteria;
    if (!!searchCriteria.searchSkill) {
      this.searchSkills.push(searchCriteria.searchSkill);
    }
    this.employeeResponseEvent.emit(this.searchResponse);
  }

  removeSkill(i: number): void {
    this.searchSkills.splice(i, 1);
  }


}
