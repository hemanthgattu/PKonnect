import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public employeeDetails: any;
  public displayProfile = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (data) => {
        const employeeId = data.get('id');
        if ( !!employeeId ) {
          this.getEmployeeDetailsWithId(+employeeId);
        } else {
          this.redirectToSearch();
        }
      }
    );
  }

  getEmployeeDetailsWithId(id: number): void {
    const getEmployeeUrl = `${environment.communitiesApi}/resources/GetResourceDetails?ResourceId=${id}`;
    this.sub = this.rest.httpGet(getEmployeeUrl).subscribe(
      (data) => {
        if (data.recordCount > 0 && data.resourceSkillDetails.length > 0 ) {
          this.employeeDetails = data.resourceSkillDetails[0];
          this.displayProfile = true;
          console.log(this.employeeDetails);
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
    this.sub.unsubscribe();
  }


}
