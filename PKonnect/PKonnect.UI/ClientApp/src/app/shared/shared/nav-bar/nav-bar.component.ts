import { Component, OnInit, HostListener } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { SharedMethodsService } from '../services/shared-methods/shared-methods.service';
import { Router } from '@angular/router';

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
  public isMobile = false;
  private resizeTimeout: any;

  constructor(
    private adalSvc: MsAdalAngular6Service,
    private sharedMethods: SharedMethodsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userName = this.adalSvc.LoggedInUserName;
    this.isMobile = this.sharedMethods.isMobile();
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

  goToProfile() {
    this.router.navigate(['profile', { id: this.userName }]);
  }

  goToHome() {
    this.router.navigate(['']);
  }

}
