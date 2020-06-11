import { Component, OnInit, HostListener } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { SharedMethodsService } from '../services/shared-methods/shared-methods.service';
import { Router } from '@angular/router';
import { RestService } from '../services/rest/rest.service';
import { AuthService } from '../services/auth/auth.service';

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
    private sharedMethods: SharedMethodsService,
    private router: Router,
    private authSvc: AuthService
    ) { }

  ngOnInit(): void {
    this.isMobile = this.sharedMethods.isMobile();
    this.userName = this.authSvc.getUserDetails().name;
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
    this.router.navigate(['/profile'], { queryParams: { id: this.userName } });
  }

  goToHome() {
    this.router.navigate(['']);
  }

}
