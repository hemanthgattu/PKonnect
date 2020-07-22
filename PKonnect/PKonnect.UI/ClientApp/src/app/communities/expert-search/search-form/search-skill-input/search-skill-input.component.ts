import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-search-skill-input',
  templateUrl: './search-skill-input.component.html',
  styleUrls: ['./search-skill-input.component.scss']
})
export class SearchSkillInputComponent implements OnInit, OnDestroy {

  @Output() public searchSkillEvent = new EventEmitter();

  private subs = new SubSink();
  public valid: boolean;

  filteredOptions: Observable<string[]>;
  options: string[] = [];
  selectedSkills = [];

  myControl: FormControl;

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // get skills
    this.getAllSkills();

    this.myControl = new FormControl();

    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string) {
    if (!!value) {
      const filterValue = value.toLowerCase();
      this.availSkillsValidator(value);
      return this.options.filter(option => {
        if (!!option && option.toLowerCase().includes(filterValue) && !this.selectedSkills.includes(option)) {
          return option;
        }
      });
    }
  }

  /*
    option.toLowerCase().includes(filterValue) && !this.selectedSkills.includes(option)

    if (!!option && option.toLowerCase().includes(filterValue) && !this.selectedSkills.includes(option)) {
        return option;
    }
  */

  public log(value: string) {
    if (!!value && !this.selectedSkills.includes(value) && this.selectedSkills.length < 5) {
      this.selectedSkills.push(value);
      this.searchSkillEvent.emit(this.selectedSkills);
    } else if (this.selectedSkills.length === 5) {
      this.snackBar.open('Cant add more than 5 skills', undefined, { panelClass: 'snack-bar-warning' });
    } else if (this.selectedSkills.includes(value)) {
      this.snackBar.open('Skill already added to search', undefined, { panelClass: 'snack-bar-warning' });
    }
  }

  getAllSkills(): void {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/Skills?$select=textName`).subscribe(
      (data) => {
        this.options = data.map((skill) => skill.TextName);
      },
      (error: Error) => console.error(error)
    ));
  }

  getErrorMessage() {
    return 'Error';
  }

  availSkillsValidator(input: string): void {
    this.valid = this.options.map(v => v.toLowerCase()).includes(input.toLowerCase());
  }

  emptySkill() {
    this.myControl.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

