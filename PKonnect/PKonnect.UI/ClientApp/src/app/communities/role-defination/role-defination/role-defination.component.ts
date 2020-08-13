import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment.dev';
import { SubSink } from 'subsink';
import { Role } from 'src/app/models/role.interface';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-role-defination',
  templateUrl: './role-defination.component.html',
  styleUrls: ['./role-defination.component.scss']
})
export class RoleDefinationComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public roles: Role[];
  public displayRoles = false;
  public displayedRoleColumns: string[] = ['roleName', 'serviceLine', 'coE', 'discipline'];
  public roleDataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  myControl: FormControl;

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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterTable(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.roleDataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
