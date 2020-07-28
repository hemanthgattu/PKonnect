import { Component, OnInit, HostListener, OnChanges, OnDestroy } from '@angular/core';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { SharedMethodsService } from '../services/shared-methods/shared-methods.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest/rest.service';
import { AuthService } from '../services/auth/auth.service';
import { SubSink } from 'subsink';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public faBars = faBars;
  public faTimes = faTimes;
  public faUserCircle = faUserCircle;
  public faSearch = faSearch;
  public toggle = true;
  public userName: string;
  public isMobile = false;
  private resizeTimeout: any;
  public displaySearch = false;

  private subs = new SubSink();
  myControl: FormControl;
  filteredOptions: Observable<string[]>;
  options: any[] = [];
  public employeeId: string;

  constructor(
    private sharedMethods: SharedMethodsService,
    private router: Router,
    private authSvc: AuthService,
    private rest: RestService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.isMobile = this.sharedMethods.isMobile();
    this.userName = this.authSvc.getUserDetails().name;

    this.subs.sink = this.router.events.subscribe((val) => {
      if (this.location.path().includes('/profile')) {
        this.displaySearch = true;
      } else {
        this.displaySearch = false;
      }
    });

    this.getAllEmployeeNames();

    this.myControl = new FormControl();

    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.getEmployeeId();
  }

  private _filter(value) {
    if (!!value) {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => {
        if (!!option.FullName && option.FullName.toLowerCase().includes(filterValue)) {
          return option;
        }
      });
    }
  }

  getAllEmployeeNames() {
    this.subs.sink = this.rest.httpGet(`${environment.communitiesApi}/resources?$select=fullName,employeeId&$filter=Category ne 'In-House'`)
    .subscribe(
      (data) => {
        this.options = data;
      },
      (error: Error) => console.error(error)
    );
  }

  public log(value: string) {
    this.router.navigate(['/profile'], { queryParams: { id: value } });
  }

  toggleIcon() {
    this.toggle = !this.toggle;
  }

  // Checks width of the screen when screen re-size
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.isMobile = this.sharedMethods.isMobile();
    }).bind(this), 500);
  }

  getEmployeeId() {
    this.subs.sink = this.locationService.getEmployeeId.subscribe(
      (data) => {
        this.employeeId = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToProfile() {
    this.router.navigate(['/profile'], { queryParams: { id: this.employeeId } });
  }

  goToHome() {
    this.router.navigate(['']);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
