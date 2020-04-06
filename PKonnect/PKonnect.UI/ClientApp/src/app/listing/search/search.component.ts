import { Component, OnInit, HostListener } from '@angular/core';
import { faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public isMobile = false;
  public toggleSearchForm = false;
  private resizeTimeout: any;
  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria;
  public searchSkills = [];

  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.checkWidth();
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

  // On Submit Filter Results
  searchEmployees(searchCriteria: SearchCriteria): void {
    this.toggleSearchForm = false;
    this.searchEmployeesRequest = searchCriteria;
    if (!!searchCriteria.searchSkill) {
      this.searchSkills.push(searchCriteria.searchSkill);
    }
  }

  removeSkill(i: number): void {
    this.searchSkills.splice(i, 1);
  }

}
