import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, startWith, switchMap, of as observableOf, Subject, debounceTime } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagedUsersDto, UserDto } from '../../Dtos/dtos';
import { AuthService } from '../../services/auth.service';
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';


@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements AfterViewInit, OnInit {
  title: string = 'Company Settings';
  displayedColumns: string[] = ['name', 'role', 'email', 'portalAccess', 'invitationStatus', 'lastLogin'];
  data!: UserDto[];
  subject = new Subject<string>();

  resultsLength = 0;
  isLoadingResults = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private overlayService: SpinnerOverlayService,
    private authService: AuthService  ) {

  }

  ngOnInit() {
    this.subject.pipe(debounceTime(1000)).subscribe(f => {
      this.getUsers(0, f)
        .subscribe(res => {
          this.data = res.users;
          this.resultsLength = res.totalCount;
          this.overlayService.hide();
        })
    });
  }

  ngAfterViewInit() {
    this.getUsers(0).subscribe(res => {
      this.data = res.users;
      this.resultsLength = res.totalCount;
      this.overlayService.hide();
    })
  }

  getName(row: any) {
    return `${row.firstName} ${row.lastName}`;
  }



  // this should probably go into it's own service, but for now it's fine.
  getUsers(page: number, filter?: string) {
    this.overlayService.show();

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("pageSize", this.paginator.pageSize);
    if (filter)
      queryParams = queryParams.append("filter", filter);

    return this.http.get<PagedUsersDto>(environment.apiUrl + '/users/getusers', { params: queryParams });
  }

  logout(): void {
    this.authService.logout();
  }

  applyUserFilter(event: any) {
    this.subject.next(event.target.value);
  }

  applyRoleFilter(event: any) {

  }

  applyStatusFilter(event: any) {

  }


}

