import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SubSink } from 'subsink';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-search-role-input',
  templateUrl: './search-role-input.component.html',
  styleUrls: ['./search-role-input.component.scss']
})
export class SearchRoleInputComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @Output() searchRoleEvent = new EventEmitter();

  public faQuestionCircle = faQuestionCircle;
  public roleControl = new FormControl();
  public filteredRoleOptions: Observable<string[]>;
  public roleOptions: string[] = [];

  constructor(
    private rest: RestService
  ) { }

  ngOnInit(): void {

    this.getAllRoles();

    this.filteredRoleOptions = this.roleControl.valueChanges.pipe(
      startWith(''),
      map(value => this._roleFilter(value))
    );
  }

  _roleFilter(value: string) {
    if (!!value) {
      const filterValue = value.toLowerCase();
      return this.roleOptions.filter(option => {
        if (!!option && option.toLowerCase().includes(filterValue)) {
          return option;
        }
      });
    }
  }

  getAllRoles(): void {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/roles?$select=roleName`).subscribe(
      (data) => {
        this.roleOptions = data.map(role => role.RoleName);
      },
      (error: Error) => {
        console.error(error);
      }
    ));
  }

  public setRole(value: string) {
    this.searchRoleEvent.emit(value);
  }

  handleEmptyInput(event: any) {
    this.setRole(event.target.value);
  }

  emptyRole() {
    this.roleControl.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
