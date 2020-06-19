import { Component, OnInit, Input } from '@angular/core';
import { faUserCircle, faMap, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faCheckCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { RestService } from '../../shared/services/rest/rest.service';
import { AuthService } from '../../shared/services/auth/auth.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
};

@Component({
  selector: 'app-employee-search-card',
  templateUrl: './employee-search-card.component.html',
  styleUrls: ['./employee-search-card.component.scss'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class EmployeeSearchCardComponent implements OnInit {

  public displayMoreSkills = false;
  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;
  public faCheckCircle = faCheckCircle;
  public faMap = faMap;
  public faEnvelope = faEnvelope;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;

  public employee: any;
  public displayPicture: any;
  public displayEmployeeSkills = [];
  public displayEmployeeSkillCount = 4;
  public isEmployee: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private restService: RestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  @Input()
  set employeeData(employee: any) {
    this.employee = employee;
    this.displayEmployeeSkills = this.employee.resourceSkills.slice(0, this.displayEmployeeSkillCount);
    this.setDisplayPicture(this.employee);
    this.isEmployee = this.setEmployee(this.employee.employeeId);
  }

  setDisplayPicture(employee: any) {
    if (employee.gender === 'Male') {
      this.displayPicture = '../../../../assets/avatars/male.png';
    } else {
      this.displayPicture = '../../../../assets/avatars/female.png';
    }
    const url = `https://graph.microsoft.com/v1.0/users/${employee.email}/photo/$value`;
    this.authService.acquireAccessToken().then(result => {
      this.restService.httpGet(url, result).subscribe(
        (data) => {
          this.createImageFromBlob(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.displayPicture = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  copyEmailToClipboard(input: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = input;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBar.open('Email Copied to Clipboard', undefined , { panelClass: 'snack-bar-success' });
  }

  goToProfile(employeeId: number) {
    this.router.navigate(['/profile'], { queryParams: { id: employeeId} });
  }

  showMoreSkills(): void {
    this.displayMoreSkills = true;
    this.displayEmployeeSkills = this.employee.resourceSkills;
  }

  showLessSkills(): void {
    this.displayMoreSkills = false;
    this.displayEmployeeSkills = this.employee.resourceSkills.slice(0, this.displayEmployeeSkillCount);
  }

  setEmployee(employeeId: string): boolean {
    if (employeeId.slice(0, 2) === 'E1') {
      return true;
    }
    return false;
  }
}


