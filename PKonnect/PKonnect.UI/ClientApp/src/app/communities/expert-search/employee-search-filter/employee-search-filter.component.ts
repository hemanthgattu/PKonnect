import { Component, OnInit, HostListener, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { faSlidersH, faTimes, faSearch, faSpinner, fas, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchNameInputComponent } from '../search-form/search-name-input/search-name-input.component';
import { SearchSkillInputComponent } from '../search-form/search-skill-input/search-skill-input.component';
import { SubSink } from 'subsink';
import { SearchRoleInputComponent } from '../search-form/search-role-input/search-role-input.component';
import { SearchAvailInputComponent } from '../search-form/search-avail-input/search-avail-input.component';
import { SearchLocationInputComponent } from '../search-form/search-location-input/search-location-input.component';
import { AmplitudeService } from 'src/app/shared/shared/services/amplitude/amplitude.service';
import { AmplitudeEvent } from 'src/app/models/amplitudeEvents.enum';
import { SearchCertificationInputComponent } from '../search-form/search-certification-input/search-certification-input.component';
import { AuthService } from 'src/app/shared/shared/services/auth/auth.service';
import { SharedMethodsService } from 'src/app/shared/shared/services/shared-methods/shared-methods.service';
import { LocationService } from 'src/app/shared/shared/services/location/location.service';

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
  @ViewChild(SearchCertificationInputComponent) certChildComp: SearchCertificationInputComponent;
  public isMobile = false;
  public toggleSearchForm = true;
  private resizeTimeout: any;
  private subs = new SubSink();

  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  public faSearch = faSearch;
  public faSpinner = faSpinner;
  public fas = fas;
  public faQuestionCircle = faQuestionCircle;

  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria = {};
  public searchSkills = [];
  public searchName: string;
  public isFindingExperts = false;
  @Output() public employeeResponseEvent = new EventEmitter();
  public modifiedDate: number;

  public pageNumber = 1;
  public pageSize = 10;

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private amplitudeSvc: AmplitudeService,
    private authSvc: AuthService,
    private sharedMethods: SharedMethodsService,
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();
    this.getModifiedDate();
    this.getUserLocation();
  }

  getUserLocation() {
    this.subs.sink = this.locationService.getLocation.subscribe(
      (data: string) => {
        if (!!data) {
          this.searchEmployeesRequest.location = data;
          this.searchEmployees(1, 10, true);
        }
      },
      (error) => {
        console.error(error);
      }
    );
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

  getModifiedDate() {
    const getDateURL = environment.communitiesApi + '/ResourceCertifications?$select=modifiedDate&$top=1&$orderby=modifiedDate%20DESC';
    this.subs.add(
      this.rest.httpGet(getDateURL).subscribe(
        (data) => {
          this.modifiedDate = this.sharedMethods.getTimeDifference(data[0].ModifiedDate);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  // On Init Search
  onInitSearchEmployees(): void {
    this.isFindingExperts = true;
    const location = 'USA';
    const getEmployeesUrl = `${environment.communitiesApi}/resources/GetResourceDetails?location=${location}&pageNumber=1&pageSize=10&email=${this.authSvc.getUserDetails().email}`;
    this.subs.add(this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.resourceSkillDetails.length <= 0) {
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
    this.toggleSearchForm = true;
    this.searchEmployeesRequest.skillName = this.searchSkills;
    const filterResultsURL = `${environment.communitiesApi}/resources/GetResourceDetails`;
    const getEmployeesUrl = this.createEmployeeRequest(filterResultsURL, this.searchEmployeesRequest, pageNumber, pageSize);
    if (this.pageNumber === 1) {
      const eventProps = {
        role: !!this.searchEmployeesRequest.role ? this.searchEmployeesRequest.role : null,
        skill: this.searchEmployeesRequest.skillName
      };
      if (eventProps.role || eventProps.skill.length > 0) {
        this.amplitudeSvc.setEvent(AmplitudeEvent.SEARCH, eventProps);
      } else {
        this.amplitudeSvc.setEvent(AmplitudeEvent.SEARCH);
      }
    } else if (this.pageNumber > 1) {
      this.amplitudeSvc.setEvent(AmplitudeEvent.SEARCH_MORE);
    }
    this.subs.add(this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.resourceSkillDetails.length <= 0) {
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
      finalUrl += `&pageNumber=${pageNumb}&pageSize=${pageSize}&email=${this.authSvc.getUserDetails().email}`;
    } else {
      finalUrl += `pageNumber=${pageNumb}&pageSize=${pageSize}&email=${this.authSvc.getUserDetails().email}`;
    }
    return finalUrl;
  }

  addSkill(value: string) {
    this.searchSkills.push(value);
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

  certMessage(message: string) {
    this.searchEmployeesRequest.certificationNames = message;
  }
  emptySkills() {
    this.searchSkills = [];
    this.searchEmployeesRequest.resourceStatus = undefined;
    this.searchEmployeesRequest.role = undefined;
    this.searchEmployeesRequest.location = undefined;
    this.searchEmployeesRequest.employeeName = undefined;
    this.searchEmployeesRequest.certificationNames = undefined;
    this.searchNameChildComp.emptyName();
    this.searchRoleChildComp.emptyRole();
    this.searchAvailChildComp.emptyAvail();
    this.searchLocationChildComp.emptyLocation();
    this.searchSkillChildComp.emptySkill();
    this.certChildComp.emptyCert();
    this.searchSkillChildComp.selectedSkills = [];
    this.employeeResponseEvent.emit({
      employeeSkillDetails: [],
      recordCount: 0,
      newData: true
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
