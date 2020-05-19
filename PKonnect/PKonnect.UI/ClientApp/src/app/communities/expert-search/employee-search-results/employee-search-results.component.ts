import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { faFilter, faArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AmplitudeService } from 'src/app/shared/shared/services/amplitude/amplitude.service';
import { AmplitudeEvent } from 'src/app/models/amplitudeEvents.enum';

@Component({
  selector: 'app-employee-search-results',
  templateUrl: './employee-search-results.component.html',
  styleUrls: ['./employee-search-results.component.scss']
})
export class EmployeeSearchResultsComponent implements OnInit {

  @Output() moreEmployees = new EventEmitter();
  public employeeSearchResults = [];
  public employeeSearchResultsCount = 0;

  public faFilter = faFilter;
  public faArrowUp = faArrowUp;
  public faSpinner = faSpinner;

  public windowScrolled: boolean;
  public viewMoreLoading = false;

  constructor(private amplitudeSvc: AmplitudeService) { }

  ngOnInit(): void {
  }

  @Input()
  set employeeSearchResult(searchResult: any) {
    if (!!searchResult) {
      if (!searchResult.newData) {
        this.employeeSearchResults = this.employeeSearchResults.concat(searchResult.employeeSkillDetails);
      } else {
        this.employeeSearchResults = searchResult.employeeSkillDetails;
      }
      this.employeeSearchResultsCount = searchResult.recordCount;
      this.viewMoreLoading = false;
    }
  }

  viewMore() {
    this.viewMoreLoading = true;
    this.moreEmployees.emit();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 30) {
          this.windowScrolled = false;
      }
  }

  scrollToTop() {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

}
