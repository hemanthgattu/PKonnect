import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { AmplitudeEvent } from 'src/app/models/amplitudeEvents.enum';
import { AmplitudeService } from 'src/app/shared/shared/services/amplitude/amplitude.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private querySub: Subscription;
  public employeeDetails: any;
  public displayProfile = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
    private router: Router,
    private ampService: AmplitudeService
    ) { }

  ngOnInit(): void {
    this.ampService.setEvent(AmplitudeEvent.VIEW_PROFILE);
    this.querySub = this.activatedRoute.queryParamMap.subscribe(
      (data) => {
        const employeeId = data.get('id');
        if ( !!employeeId ) {
          this.getEmployeeDetailsWithId(employeeId);
        } else {
          this.redirectToSearch();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEmployeeDetailsWithId(id: string): void {
    const getEmployeeUrl = `${environment.communitiesApi}/resources/${id}`;
    this.sub = this.rest.httpGet(getEmployeeUrl).subscribe(
      (data) => {
        if (data.primaryEmailAddress) {
          this.employeeDetails = data;
          const viewProfileSearch = {
            searchedUserId: this.employeeDetails.primaryEmailAddress.split('@')[0]
          };
          this.ampService.setEvent(AmplitudeEvent.VIEW_PROFILE_SEARCH, viewProfileSearch);
          this.displayProfile = true;
        } else {
          this.redirectToSearch();
        }
      },
      (error) => {
        console.log(error);
        this.redirectToSearch();
      }
    );
  }

  redirectToSearch(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (!!this.sub) {
      this.sub.unsubscribe();
      this.querySub.unsubscribe();
    }
  }


}
