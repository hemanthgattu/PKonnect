import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-skill-input',
  templateUrl: './search-skill-input.component.html',
  styleUrls: ['./search-skill-input.component.scss']
})
export class SearchSkillInputComponent implements OnInit {

  @Output() public searchSkillEvent = new EventEmitter();
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  selectedSkills = [];

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    // get skills
    this.getAllSkills();
    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue) && !this.selectedSkills.includes(option));
  }

  public log(value: string) {
    if (!!value && !this.selectedSkills.includes(value) && this.selectedSkills.length < 5) {
      this.selectedSkills.push(value);
      this.searchSkillEvent.emit(this.selectedSkills);
    } else if (this.selectedSkills.length === 5) {
      this.snackBar.open('Cant add more than 5 skills', undefined , { panelClass: 'snack-bar-warning' });
    } else if (this.selectedSkills.includes(value)) {
      this.snackBar.open('Skill already added to search', undefined , { panelClass: 'snack-bar-warning' });
    }
  }

  getAllSkills() {
    this.rest.httpGet(`https://pkwebapi.azurewebsites.net/api/Skills`).subscribe(
        (data) => {
          this.options = data.map((skill) => skill.textName);
        },
        (error) => console.log(error)
      );
  }

}
