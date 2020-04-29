import { Component, OnInit } from '@angular/core';
import { faUserCircle, faMap, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-hero',
  templateUrl: './employee-hero.component.html',
  styleUrls: ['./employee-hero.component.scss']
})
export class EmployeeHeroComponent implements OnInit {

  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;
  public faCheckCircle = faCheckCircle;
  public faMap = faMap;
  public faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
