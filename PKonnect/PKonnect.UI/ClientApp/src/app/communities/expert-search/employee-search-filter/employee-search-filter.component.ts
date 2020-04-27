import { Component, OnInit, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';
import { faSlidersH, faTimes, faSearch, faSpinner, fas } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../environments/environment';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SearchNameInputComponent } from '../search-form/search-name-input/search-name-input.component';
import { SearchSkillInputComponent } from '../search-form/search-skill-input/search-skill-input.component';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-employee-search-filter',
  templateUrl: './employee-search-filter.component.html',
  styleUrls: ['./employee-search-filter.component.scss']
})
export class EmployeeSearchFilterComponent implements OnInit {

  @ViewChild(SearchNameInputComponent) searchNameChildComp: SearchNameInputComponent;
  @ViewChild(SearchSkillInputComponent) searchSkillChildComp: SearchSkillInputComponent;
  public isMobile = false;
  public toggleSearchForm = false;
  private resizeTimeout: any;

  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  public faSearch = faSearch;
  public faSpinner = faSpinner;
  public fas = fas;

  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria = {};
  public searchSkills = [];
  public searchName = '';
  public isFindingExperts = false;
  @Output() public employeeResponseEvent = new EventEmitter();

  public roleControl = new FormControl();
  public filteredRoleOptions: Observable<string[]>;
  public roleOptions: string[] = [];

  public locationControl = new FormControl();
  public filteredLocationOptions: Observable<string[]>;
  public locationOptions: string[] = [
    'USA',
    'IND',
    'ARG',
    'MEX'
  ];

  public locationFlags = {
    USA: { id: 'flag-us' },
    IND: { id: 'flag-in' },
    ARG: { id: 'flag-ar' },
    MEX: { id: 'flag-mx' }
  };

  public availabilityControl = new FormControl();
  public filteredAvailabilityOptions: Observable<any>;

  public availabilityOptions = [
    {
      displayName: 'Available',
      availabilityValue: 'On Bench'
    },
    {
      displayName: 'On Project',
      availabilityValue: 'On Project'
    }
  ];

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private adalSvc: MsAdalAngular6Service
    ) { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();
    console.log('email: ' + this.adalSvc.LoggedInUserEmail);

    this.getAllRoles();

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
    return this.availabilityOptions.filter(option => option.displayName.toLowerCase().indexOf(filterValue) === 0);
  }

  // _roleFilter
  _roleFilter(value: string) {
    const filterValue = value.toLowerCase();
    return this.roleOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  // _locationFilter
  _locationFilter(value: string) {
    const filterValue = value.toLowerCase();
    return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
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
    this.isFindingExperts = true;
    this.toggleSearchForm = false;
    this.searchEmployeesRequest.employeeName = this.searchName;
    this.searchEmployeesRequest.skillName = this.searchSkills;
    const getEmployeesUrl = this.createEmployeeRequest(environment.employeeApi, this.searchEmployeesRequest, 1, 10);
    this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.length <= 0) {
          this.snackBar.open('No results found on Filter Results', undefined , { panelClass: 'snack-bar-danger' });
        }
        this.employeeResponseEvent.emit(data);
        this.isFindingExperts = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createEmployeeRequest(url: string, searchRequest: SearchCriteria, pageNumb: number, pageSize: number): string {
    let finalUrl = url + '?';

    for (const key in searchRequest) {
      if (!!key && !!searchRequest[key] && finalUrl[finalUrl.length - 1] === '?') {
        if (key !== 'skillName') {
          finalUrl += `${key}=${encodeURIComponent(searchRequest[key])}`;
        } else if (key === 'skillName' && searchRequest[key].length > 0) {
          finalUrl += `${key}=${encodeURIComponent(searchRequest[key].toString())}`;
        }
      } else if (!!key && !!searchRequest[key]) {
        if (key !== 'skillName') {
          finalUrl += `&${key}=${encodeURIComponent(searchRequest[key])}`;
        } else if (key === 'skillName' && searchRequest[key].length > 0) {
          finalUrl += `&${key}=${encodeURIComponent(searchRequest[key].toString())}`;
        }
      }
    }

    if (finalUrl[finalUrl.length - 1] !== '?') {
      finalUrl += `&pageNumber=${pageNumb}&pageSize=${pageSize}&email=${this.adalSvc.LoggedInUserEmail}`;
    } else {
      finalUrl += `pageNumber=${pageNumb}&pageSize=${pageSize}&email=${this.adalSvc.LoggedInUserEmail}`;
    }

    console.log(finalUrl);
    return finalUrl;
  }

  getAllRoles(): void{
    this.rest.httpGet('https://pkwebapi.azurewebsites.net/api/EmployeeRoles').subscribe(
      (data) => {
        this.roleOptions = data.map(role => role.roleName);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllLocations(): void{
    this.rest.httpGet('https://pkwebapi.azurewebsites.net/api/Addresses').subscribe(
      (data) => {
        this.locationOptions = data.map(location => `${location.city}, ${location.state}`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleEmptyInput(event: any, key: string){
    if (event.target.value === '') {
      console.log('empty input');
      this.searchEmployeesRequest[key] = undefined;
    }
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
    if (option === this.availabilityOptions[0].displayName) {
      this.searchEmployeesRequest.resourceStatus = this.availabilityOptions[0].availabilityValue;
    } else {
      this.searchEmployeesRequest.resourceStatus = option;
    }
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

  emptySkills() {
    this.searchSkills = [];
    this.searchEmployeesRequest.resourceStatus = undefined;
    this.searchEmployeesRequest.role = undefined;
    this.searchEmployeesRequest.location = undefined;
    this.searchName = undefined;
    this.searchNameChildComp.emptyName();
    this.searchSkillChildComp.selectedSkills = [];
  }

  reset(){
    console.log('Reset please');
  }
}
