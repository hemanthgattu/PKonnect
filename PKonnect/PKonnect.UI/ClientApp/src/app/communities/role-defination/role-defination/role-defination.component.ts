import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/role.interface';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-role-defination',
  templateUrl: './role-defination.component.html',
  styleUrls: ['./role-defination.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('10ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RoleDefinationComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public roles: Role[];
  public displayRoles = false;
  public displayedRoleColumns: string[] = ['roleName', 'serviceLine', 'coE', 'discipline'];
  public roleDataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public myControl: FormControl;
  public expandedElement: Role;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getRoles();
    this.myControl = new FormControl();
  }

  getRoles() {
    const URL = environment.communitiesApi + '/roles';
    this.subs.sink = this.restService.httpGet(URL).subscribe(
      (data: Role[]) => {
        this.roles = data;
        this.displayRoles = true;
        this.roleDataSource = new MatTableDataSource<Role>(this.roles);
        this.roleDataSource.sort = this.sort;
        this.roleDataSource.paginator = this.paginator;
        this.roleDataSource.filterPredicate = (role: Role, filter: string) => {
          const dataStr = role.roleName + role.serviceLine + role.coE + role.discipline;
          return dataStr.trim().toLowerCase().indexOf(filter) !== -1;
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterTable(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.roleDataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
