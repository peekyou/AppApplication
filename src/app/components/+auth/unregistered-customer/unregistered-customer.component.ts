import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './unregistered-customer.component.html',
    styleUrls: ['./unregistered-customer.component.scss']
})
export class UnregisteredCustomerDialogComponent {

    constructor(public dialogRef: MatDialogRef<UnregisteredCustomerDialogComponent>) {
    }
}