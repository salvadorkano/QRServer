import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  form: UntypedFormGroup;

  isSubmitting!: boolean;

  roleList: any[] = ['ADMIN', 'CUSTODIAN', 'RESIDENT'];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private userServ: UserService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      building: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const request = {
      ...this.form.getRawValue(),
    };

    this.userServ.create(request).subscribe(
      (response) => {
        this.isSubmitting = false;
        this.dialogRef.close({ success: true });
      },
      (response) => {
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
