import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  form: UntypedFormGroup;

  isSubmitting!: boolean;

  roleList: any[] = ['ADMIN', 'CUSTODIAN', 'RESIDENT'];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    private userServ: UserService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],

      role: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      building: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      ...this.data.params,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const request = {
      ...this.form.getRawValue(),
      id: this.data.params.id,
    };

    this.userServ.update(request).subscribe(
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
