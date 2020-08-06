import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SubSink } from 'subsink';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';


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
    private rest: RestService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {

    this.getAllRoles();

    this.filteredRoleOptions = this.roleControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!!value && value.length > 2) {
          return this._roleFilter(value);
        }})
    );

    const sessionRoleValue = this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_ROLE);
    if (!!sessionRoleValue) {
      this.roleControl.setValue(sessionRoleValue);
      this.searchRoleEvent.emit(sessionRoleValue);
    }
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
    if (!!value) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_ROLE, value);
    }
    this.searchRoleEvent.emit(value);
  }

  handleEmptyInput(event: any) {
    this.sessionService.deleteItem(ESessionKeys.SEARCH_ITEMS_ROLE);
    this.setRole(event.target.value);
  }

  emptyRole() {
    this.roleControl.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
