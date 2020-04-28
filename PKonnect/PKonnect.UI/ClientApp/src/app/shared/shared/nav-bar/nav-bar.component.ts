import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public faBars = faBars;
  public faTimes = faTimes;
  public faUserCircle = faUserCircle;
  public toggle = true;
  public userName: string;

  constructor(private adalSvc: MsAdalAngular6Service) { }

  ngOnInit(): void {
    this.userName = this.adalSvc.LoggedInUserName;
  }

  toggleIcon() {
    this.toggle = !this.toggle;
  }

}
