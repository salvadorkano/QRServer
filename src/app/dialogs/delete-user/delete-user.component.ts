import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  isSubmitting!: boolean;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { id: string },
    private userServ: UserService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitting = true;
    this.userServ.delete(this.data.id).subscribe(
      (response) => {
        this.isSubmitting = false;
        this.dialogRef.close({ success: true });
      },
      (response) => {
        this.isSubmitting = false;

        const error = response.error;

        this.isSubmitting = false;
        let msg = 'Ocurrio un Error';
        if (error.status !== 401) {
          if (error?.data?.message) msg = error.data.message;
          this.snackbar.open(msg, '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2 * 1000,
            panelClass: ['warn-snackbar'],
          });
        }
      }
    );
  }
}
