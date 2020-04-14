import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { faSlidersH, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../environments/environment';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  public searchEmployeesRequest: SearchCriteria = {};
  public searchSkills = [];
  public searchName = '';
  @Output() public employeeResponseEvent = new EventEmitter();

  public roleControl = new FormControl();
  public filteredRoleOptions: Observable<string[]>;
  public roleOptions: string[] = [
    'Cloud Architect',
    'Cloud Consultant',
    'Cloud Product and Project Manager',
    'Cloud Services Developer',
    'Cloud Software and Network Engineer',
    'Cloud System Administrator',
    'Cloud System Engineer'
  ];

  public locationControl = new FormControl();
  public filteredLocationOptions: Observable<string[]>;
  public locationOptions: string[] = [
    'Fort Wayne, Indiana',
    'Anchorage, Alaska',
    'Baltimore, Maryland',
    'Oklahoma City, Oklahoma',
    'St. Louis, Missouri',
    'Miami, Florida'
  ];

  public availabilityControl = new FormControl();
  public filteredAvailabilityOptions: Observable<string[]>;
  public availabilityOptions: string[] = [
    'Available',
    'Not Available',
    'Partially Available'
  ];

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();

    this.filteredAvailabilityOptions = this.availabilityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._availabilityFilter(value))
    );

    this.filteredRoleOptions = this.roleControl.valueChanges.pipe(
      startWith(''),
      map(value => this._roleFilter(value))
    );

    this.filteredLocationOptions = this.locationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._locationFilter(value))
    );
  }

  // _availabilityFilter
  _availabilityFilter(value: string) {
    const filterValue = value.toLowerCase();
    return this.availabilityOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // _roleFilter
  _roleFilter(value: string) {
    const filterValue = value.toLowerCase();
    return this.roleOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // _locationFilter
  _locationFilter(value: string) {
    const filterValue = value.toLowerCase();
    return this.locationOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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

  setAvailability(option: string) {
    console.log(option);
    this.searchEmployeesRequest.availability = option;
  }

  setRole(option: string) {
    console.log(option);
    this.searchEmployeesRequest.role = option;
  }

  setLocation(option: string) {
    console.log(option);
    this.searchEmployeesRequest.location = option;
  }

  onRoleKey(event: any) {
    console.log(event);
  }

  reset(){
    console.log('Reset please');
  }
}
