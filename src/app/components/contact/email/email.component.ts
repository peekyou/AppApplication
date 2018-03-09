import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { normalizeNumber } from '../../helpers/utils';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-email-dialog',
    templateUrl: './email.component.html'
})
export class EmailDialogComponent {
    loading = false;
    success = null;
    email = this.fb.control(null, Validators.required);
    content = this.fb.control(null, Validators.required);

    form = this.fb.group({
        email: this.email,
        content: this.content
    });

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EmailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    submitEmail(): void {
        this.loading = true;
        this.userService
            .sendEmail(this.email.value, this.content.value)
            .subscribe(
            r => {
                this.loading = false;
                this.success = r;
            },
            err => {
                console.log(err);
                this.loading = false;
                this.success = false;
            });
    }

    close(): void {
        this.dialogRef.close();
    }
}