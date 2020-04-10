import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

  toggleIcon() {
    this.toggle = !this.toggle;
  }

}
