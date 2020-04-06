import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchCriteria } from 'src/app/models/searchCriteria.interface';

@Component({
  selector: 'app-employee-search-filter',
  templateUrl: './employee-search-filter.component.html',
  styleUrls: ['./employee-search-filter.component.scss']
})
export class EmployeeSearchFilterComponent implements OnInit {

  public isMobile = false;
  public toggleSearchForm = false;
  private resizeTimeout: any;
  public faSlidersH = faSlidersH;
  public faTimes = faTimes;
  private mobileWidth = 420;
  public searchEmployeesRequest: SearchCriteria;
  public searchSkills = [];
  @Output() public employeeResponseEvent = new EventEmitter();
  public searchResponse = [
    {
      employeeName: 'Srikar',
      employeeRole: 'UI Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123456',
      employeeMentor: 'Jason',
      isMvp: false,
      available: false,
      locationCity: 'Bellevue',
      locationState: 'WA',
      employeeEmail: 'skoppisetti@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Angular',
          skillLevel: 4
        },
        {
          id: 2,
          skillName: 'Node.js',
          skillLevel: 2
        },
        {
          id: 3,
          skillName: 'HTML',
          skillLevel: 4
        },
        {
          id: 4,
          skillName: 'CSS',
          skillLevel: 4
        },
        {
          id: 5,
          skillName: 'Java',
          skillLevel: 2
        },
      ]
    },
    {
      employeeName: 'John',
      employeeRole: 'Full Stack Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123457',
      employeeMentor: 'Harry',
      isMvp: true,
      available: true,
      locationCity: 'Denver',
      locationState: 'CO',
      employeeEmail: 'john@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Angular',
          skillLevel: 3
        },
        {
          id: 2,
          skillName: 'Node.js',
          skillLevel: 5
        },
        {
          id: 3,
          skillName: 'HTML',
          skillLevel: 4
        },
        {
          id: 4,
          skillName: 'CSS',
          skillLevel: 3
        },
        {
          id: 5,
          skillName: 'Java',
          skillLevel: 4
        },
      ]
    },
    {
      employeeName: 'Smith',
      employeeRole: 'Salesforce Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123458',
      employeeMentor: 'Mike',
      isMvp: true,
      available: true,
      locationCity: 'Dallas',
      locationState: 'TX',
      employeeEmail: 'smith@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Salesforce',
          skillLevel: 4
        },
        {
          id: 2,
          skillName: 'Apex',
          skillLevel: 4
        },
        {
          id: 3,
          skillName: 'Lightning',
          skillLevel: 3
        }
      ]
    },
    {
      employeeName: 'Srikar',
      employeeRole: 'UI Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123456',
      employeeMentor: 'Jason',
      isMvp: false,
      available: false,
      locationCity: 'Bellevue',
      locationState: 'WA',
      employeeEmail: 'skoppisetti@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Angular',
          skillLevel: 4
        },
        {
          id: 2,
          skillName: 'Node.js',
          skillLevel: 2
        },
        {
          id: 3,
          skillName: 'HTML',
          skillLevel: 4
        },
        {
          id: 4,
          skillName: 'CSS',
          skillLevel: 4
        },
        {
          id: 5,
          skillName: 'Java',
          skillLevel: 2
        },
      ]
    },
    {
      employeeName: 'John',
      employeeRole: 'Full Stack Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123457',
      employeeMentor: 'Harry',
      isMvp: true,
      available: true,
      locationCity: 'Denver',
      locationState: 'CO',
      employeeEmail: 'john@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Angular',
          skillLevel: 3
        },
        {
          id: 2,
          skillName: 'Node.js',
          skillLevel: 5
        },
        {
          id: 3,
          skillName: 'HTML',
          skillLevel: 4
        },
        {
          id: 4,
          skillName: 'CSS',
          skillLevel: 3
        },
        {
          id: 5,
          skillName: 'Java',
          skillLevel: 4
        },
      ]
    },
    {
      employeeName: 'Smith',
      employeeRole: 'Salesforce Developer',
      employeeDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      employeeId: '123458',
      employeeMentor: 'Mike',
      isMvp: true,
      available: true,
      locationCity: 'Dallas',
      locationState: 'TX',
      employeeEmail: 'smith@pkglobal.com',
      employeeSkills: [
        {
          id: 1,
          skillName: 'Salesforce',
          skillLevel: 4
        },
        {
          id: 2,
          skillName: 'Apex',
          skillLevel: 4
        },
        {
          id: 3,
          skillName: 'Lightning',
          skillLevel: 3
        }
      ]
    }
  ];

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
    this.employeeResponseEvent.emit(this.searchResponse);
  }

  removeSkill(i: number): void {
    this.searchSkills.splice(i, 1);
  }


}
