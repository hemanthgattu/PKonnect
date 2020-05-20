import { Component, OnInit, HostListener, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { faSlidersH, faTimes, faSearch, faSpinner, fas } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../environments/environment';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchNameInputComponent } from '../search-form/search-name-input/search-name-input.component';
import { SearchSkillInputComponent } from '../search-form/search-skill-input/search-skill-input.component';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { SubSink } from 'subsink';
import { SearchRoleInputComponent } from '../search-form/search-role-input/search-role-input.component';
import { SearchAvailInputComponent } from '../search-form/search-avail-input/search-avail-input.component';
import { SearchLocationInputComponent } from '../search-form/search-location-input/search-location-input.component';
import { AmplitudeService } from 'src/app/shared/shared/services/amplitude/amplitude.service';
import { AmplitudeEvent } from 'src/app/models/amplitudeEvents.enum';

@Component({
  selector: 'app-employee-search-filter',
  templateUrl: './employee-search-filter.component.html',
  styleUrls: ['./employee-search-filter.component.scss']
})
export class EmployeeSearchFilterComponent implements OnInit, OnDestroy {

  @ViewChild(SearchNameInputComponent) searchNameChildComp: SearchNameInputComponent;
  @ViewChild(SearchSkillInputComponent) searchSkillChildComp: SearchSkillInputComponent;
  @ViewChild(SearchRoleInputComponent) searchRoleChildComp: SearchRoleInputComponent;
  @ViewChild(SearchAvailInputComponent) searchAvailChildComp: SearchAvailInputComponent;
  @ViewChild(SearchLocationInputComponent) searchLocationChildComp: SearchLocationInputComponent;
  public isMobile = false;
  public toggleSearchForm = false;
  private resizeTimeout: any;
  private subs = new SubSink();

  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  public faSearch = faSearch;
  public faSpinner = faSpinner;
  public fas = fas;

  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria = {};
  public searchSkills = [];
  public searchName: string;
  public isFindingExperts = false;
  @Output() public employeeResponseEvent = new EventEmitter();

  public pageNumber = 1;
  public pageSize = 10;

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private adalSvc: MsAdalAngular6Service,
    private amplitudeSvc: AmplitudeService
    ) { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();
    // this.onInitSearchEmployees();
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

  // On Init Search
  onInitSearchEmployees(): void {
    this.isFindingExperts = true;
    const getEmployeesUrl = 'https://communities.pkglobal.com/API/api/Employees/GetEmployeeDetails?skillName=ASP.NET%20MVC%2CC%23&pageNumber=1&pageSize=10';
    this.subs.add(this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.length <= 0) {
          this.snackBar.open('No results found on Filter Results', undefined , { panelClass: 'snack-bar-danger' });
        }
        this.employeeResponseEvent.emit(data);
        this.isFindingExperts = false;
      },
      (error: Error) => {
        console.error(error);
        this.snackBar.open('No results found on Filter Results', undefined , { panelClass: 'snack-bar-danger' });
        this.isFindingExperts = false;
      }
    ));
  }

  // On Submit Filter Results
  searchEmployees(pageNumber: number, pageSize: number, newData: boolean): void {
    if (newData) {
      this.pageNumber = 1;
    }
    this.isFindingExperts = true;
    this.toggleSearchForm = false;
    this.searchEmployeesRequest.skillName = this.searchSkills;
    const filterResultsURL = `${environment.communitiesApi}/Employees/GetEmployeeDetails`;
    const getEmployeesUrl = this.createEmployeeRequest(filterResultsURL, this.searchEmployeesRequest, pageNumber, pageSize);
    console.log(this.searchEmployeesRequest);
    if (this.pageNumber === 1) {
      this.amplitudeSvc.setEvent(AmplitudeEvent.SEARCH, this.searchEmployeesRequest);
    } else if (this.pageNumber > 1) {
      this.amplitudeSvc.setEvent(AmplitudeEvent.SEARCH_MORE);
    }
    this.subs.add(this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.employeeSkillDetails.length <= 0) {
          this.snackBar.open('No results found on Filter Results', undefined , { panelClass: 'snack-bar-danger' });
        }
        if (this.pageNumber <= 1) {
          data.newData = newData;
        } else {
          data.newData = newData;
        }
        this.employeeResponseEvent.emit(data);
        this.isFindingExperts = false;
      },
      (error: Error) => {
        console.error(error);
        this.snackBar.open('No results found on Filter Results', undefined , { panelClass: 'snack-bar-danger' });
        this.isFindingExperts = false;
      }
    ));
  }

  getMoreEmployees() {
    this.pageNumber++;
    this.searchEmployees(this.pageNumber, this.pageSize, false);
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
    this.searchEmployeesRequest.employeeName = message;
  }

  roleMessage(message: string) {
    this.searchEmployeesRequest.role = message;
  }

  availMessage(message: string) {
    this.searchEmployeesRequest.resourceStatus = message;
  }

  locationMessage(message: string) {
    this.searchEmployeesRequest.location = message;
  }

  emptySkills() {
    this.searchSkills = [];
    this.searchEmployeesRequest.resourceStatus = undefined;
    this.searchEmployeesRequest.role = undefined;
    this.searchEmployeesRequest.location = undefined;
    this.searchEmployeesRequest.employeeName = undefined;
    this.searchNameChildComp.emptyName();
    this.searchRoleChildComp.emptyRole();
    this.searchAvailChildComp.emptyAvail();
    this.searchLocationChildComp.emptyLocation();
    this.searchSkillChildComp.selectedSkills = [];
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
