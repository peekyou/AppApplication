import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    user: User;
    editing = false;
    loading = false;
    
    firstname = this.fb.control(null, Validators.required);
    lastname = this.fb.control(null, Validators.required);
    email = this.fb.control(null, this.customEmailValidator);
    birthdate = this.fb.control(null);
    address1 = this.fb.control(null);
    address2 = this.fb.control(null);
    city = this.fb.control(null);
    receiveSms = this.fb.control(null);

    form = this.fb.group({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        birthdate: this.birthdate,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        receiveSms: this.receiveSms
    });
    
    constructor(public service: UserService, private router: Router, private fb: FormBuilder) {
        service
            .getUser()
            .subscribe(
                user => this.init(user),
                err => { console.log(err); }
            );
    }

    init(user: User) {
        if (user) {
            this.user = user;
            this.firstname.setValue(user.firstname);
            this.lastname.setValue(user.lastname);
            this.email.setValue(user.email);
            this.birthdate.setValue(user.birthdate);
            this.receiveSms.setValue(user.receiveSms);
            if (user.address) {
                this.city.setValue(user.address.city);
                this.address1.setValue(user.address.addressLine1);
                this.address2.setValue(user.address.addressLine2);
            }
        }
    }

    logout() {
        this.service.logout();
        this.router.navigate(['/']);
    }

    saveUser() {
        this.loading = true;
        this.user.firstname = this.firstname.value;
        this.user.lastname = this.lastname.value;
        this.user.email = this.email.value;
        this.user.birthdate = this.birthdate.value;
        this.user.receiveSms = this.receiveSms.value;
        if (this.city.value || this.address1.value || this.address2.value) {
            this.user.address = {
                country: {
                    id: 'AE'
                },
                city: this.city.value,
                addressLine1: this.address1.value,
                addressLine2: this.address2.value
            };
        }

        this.service
            .save(this.user)
            .subscribe(
                r => this.editing = this.loading = false,
                err => this.editing = this.loading = false
            );
    }

    cancelEdit() {
        this.editing = false;
    }

    private customEmailValidator(control: AbstractControl): ValidationErrors {
        if (!control.value) {
            return null;
        }
        return Validators.email(control);
    }
}
