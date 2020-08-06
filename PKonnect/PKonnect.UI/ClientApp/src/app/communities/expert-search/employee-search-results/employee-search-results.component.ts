import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { faFilter, faArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AmplitudeService } from 'src/app/shared/shared/services/amplitude/amplitude.service';
import { AmplitudeEvent } from 'src/app/models/amplitudeEvents.enum';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';

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

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getSessionResults();
  }

  @Input()
  set employeeSearchResult(searchResult: any) {
    if (!!searchResult) {
      if (!searchResult.newData) {
        this.employeeSearchResults = this.employeeSearchResults.concat(searchResult.resourceSkillDetails);
      } else {
        this.employeeSearchResults = searchResult.resourceSkillDetails;
      }
      this.sessionService.setItem(ESessionKeys.SEARCH_RESULTS, JSON.stringify(this.employeeSearchResults));
      this.employeeSearchResultsCount = searchResult.recordCount;
      this.sessionService.setItem(ESessionKeys.SEARCH_RESULTS_COUNT, JSON.stringify(this.employeeSearchResultsCount));
      this.viewMoreLoading = false;
    }
  }

  getSessionResults() {
    const sessionResults = JSON.parse(this.sessionService.getItem(ESessionKeys.SEARCH_RESULTS));
    if (sessionResults) {
      this.employeeSearchResults = sessionResults;
      this.employeeSearchResultsCount = JSON.parse(this.sessionService.getItem(ESessionKeys.SEARCH_RESULTS_COUNT));
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
