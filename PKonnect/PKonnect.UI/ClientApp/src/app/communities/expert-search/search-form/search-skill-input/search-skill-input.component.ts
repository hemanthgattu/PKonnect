import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
import { SubSink } from 'subsink';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';

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
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    // get skills
    this.getAllSkills();

    this.myControl = new FormControl();

    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!!value && value.length > 2) {
          return this._filter(value);
        }})
    );

    const sessionSkillValues = JSON.parse(this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_SKILLS));
    if (!!sessionSkillValues) {
      this.selectedSkills = sessionSkillValues;
      this.searchSkillEvent.emit(sessionSkillValues);
    }
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
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_SKILLS, JSON.stringify(this.selectedSkills));
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

