import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-kano-tec';

  displayedColumns: string[] = ['id', 'name', 'description', 'code', 'action'];

  list: any[] = [];

  constructor(private userServ: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getList();
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
      },
      error: () => {},
    });
  }
}
