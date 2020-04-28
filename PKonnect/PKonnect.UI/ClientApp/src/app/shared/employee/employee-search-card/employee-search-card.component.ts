import { Component, OnInit, Input } from '@angular/core';
import { faUserCircle, faMap, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-search-card',
  templateUrl: './employee-search-card.component.html',
  styleUrls: ['./employee-search-card.component.scss']
})
export class EmployeeSearchCardComponent implements OnInit {

  public employee: any;

  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;
  public faCheckCircle = faCheckCircle;
  public faMap = faMap;
  public faEnvelope = faEnvelope;
  public displayPicture = 'https://prokarma001-my.sharepoint.com/User%20Photos/Profile%20Pictures/HGattu_prokarma_com_lThumb.jpg';


  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  @Input()
  set employeeData(employee: any) {
    this.employee = employee;
    this.setDisplayPicture(this.employee);
  }

  setDisplayPicture(employee: any) {
    this.displayPicture = `https://prokarma001.sharepoint.com/_layouts/15/userphoto.aspx?size=M&accountname=${employee.email}`;
  }

  copyEmailToClipboard(input: string) {
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
}


