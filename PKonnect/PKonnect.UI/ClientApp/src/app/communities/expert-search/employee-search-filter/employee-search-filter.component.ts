import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { faSlidersH, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../environments/environment';
import { element } from 'protractor';

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
  public faSearch = faSearch;
  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria;
  public searchSkills = [];
  public searchName = '';
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
      isActive: true,
      employeeSkills: [{
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Java',
        skillRating: 4
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'JavaScript',
        skillRating: 3
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Spring',
        skillRating: 5
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'HTML',
        skillRating: 2
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'CSS',
        skillRating: 2
      }
      ]
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
      isActive: true,
      employeeSkills: [{
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Java',
        skillRating: 5
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'JavaScript',
        skillRating: 3
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Spring',
        skillRating: 5
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'HTML',
        skillRating: 2
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'CSS',
        skillRating: 2
      }
      ]
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
      isActive: true,
      employeeSkills: [{
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Java',
        skillRating: 5
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'JavaScript',
        skillRating: 3
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'Spring',
        skillRating: 5
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'HTML',
        skillRating: 2
      },
      {
        employeeSkillId: 1,
        employeeId: 2,
        skillId: 2,
        bestFitSkill: true,
        contact: null,
        lastYearUsed: 2020,
        submitted: true,
        modifiedDate: '2020-04-08T12:05:32.7+00:00',
        createdDate: '2020-04-08T12:05:32.7+00:00',
        isActive: true,
        skillName: 'CSS',
        skillRating: 2
      }
      ]
    }
  ];

  public roles = [
    'Cloud Architect',
    'Cloud Consultant',
    'Cloud Product and Project Manager',
    'Cloud Services Developer',
    'Cloud Software and Network Engineer',
    'Cloud System Administrator',
    'Cloud System Engineer'
  ];

  public locations = [
    'Fort Wayne, Indiana',
    'Anchorage, Alaska',
    'Baltimore, Maryland',
    'Oklahoma City, Oklahoma',
    'St. Louis, Missouri',
    'Miami, Florida'
  ];

  constructor(private rest: RestService) { }

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
    this.searchEmployeesRequest.employeeName = this.searchName;
    this.searchEmployeesRequest.searchSkill = this.searchSkills;
    console.log(this.searchEmployeesRequest);
    const getEmployeesUrl = this.createEmployeeRequest(environment.employeeApi, this.searchEmployeesRequest, 1, 10);
    this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        this.employeeResponseEvent.emit(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createEmployeeRequest(url: string, searchRequest: SearchCriteria, pageNumb: number, pageSize: number): string {
    let finalUrl = url + '?';

    if (searchRequest.searchSkill.length > 0) {
      finalUrl += 'skillName=' + searchRequest.searchSkill.toString();
    }

    if (!!searchRequest.employeeName) {
      if (finalUrl.includes('?skillName')) {
        finalUrl += '&employeeName=' + searchRequest.employeeName;
      } else {
        finalUrl += 'employeeName=' + searchRequest.employeeName;
      }
    }

    if (finalUrl.includes('?skillName') || finalUrl.includes('?employeeName')) {
      finalUrl += `&pageNumber=${pageNumb}&pageSize=${pageSize}`;
    } else {
      finalUrl += `pageNumber=${pageNumb}&pageSize=${pageSize}`;
    }

    console.log(finalUrl);
    return finalUrl;
  }

  addSkill(value: string) {
    this.searchSkills.push(value);
    console.log(this.searchSkills);
  }

  removeSkill(i: number): void {
    this.searchSkills.splice(i, 1);
  }

  skillMessage(message: []) {
    this.searchSkills = message;
  }

  nameMessage(message: string) {
    this.searchName = message;
  }

  onRoleKey(event: any) {
    console.log(event);
  }


}
