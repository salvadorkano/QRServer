import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-kano-tec';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'code', 'action'];

  list: any[] = [];

  dataSource = new MatTableDataSource<any[]>();
  selection = new SelectionModel<any>(true, []);

  totalRecords: number = 0;
  pageSize: number = 5;

  constructor(private userServ: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  create() {
    this.dialog
      .open(CreateUserComponent, {
        disableClose: false,
        width: '700px',
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getList();
        }
      });
  }

  update(element: any) {
    this.dialog
      .open(UpdateUserComponent, {
        disableClose: false,
        width: '700px',
        data: { params: element },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getList();
        }
      });
  }

  delete(element: any) {
    this.dialog
      .open(DeleteUserComponent, {
        disableClose: false,
        width: '400px',
        data: { id: element.id },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getList();
        }
      });
  }

  onChangePage(event: any) {}

  getList() {
    this.userServ.getList().subscribe({
      next: (response) => {
        this.list = response.data;
        this.dataSource = new MatTableDataSource<any[]>(this.list);
        this.totalRecords = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {},
    });
  }
}
