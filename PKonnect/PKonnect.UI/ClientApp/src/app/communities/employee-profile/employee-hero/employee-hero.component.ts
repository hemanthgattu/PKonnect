import { Component, OnInit, Input } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-hero',
  templateUrl: './employee-hero.component.html',
  styleUrls: ['./employee-hero.component.scss']
})
export class EmployeeHeroComponent implements OnInit {

  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;
  @Input() employeeHeroDetails: any;

  constructor() { }

  ngOnInit(): void {}
}
