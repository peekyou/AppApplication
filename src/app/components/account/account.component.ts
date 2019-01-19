import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { ConfigurationService } from '../../core/services/configuration.service';
import { PushNotificationService } from '../../core/services/push-notification.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { getSubscription, subscribeUser } from '../../core/helpers/push-manager';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    user: User;
    editing = false;
    loading = false;
    pushEnabled: boolean;
    notificationsDenied: boolean = false;
    
    firstname = this.fb.control(null, Validators.required);
    lastname = this.fb.control(null, Validators.required);
    email = this.fb.control(null, Validators.email);
    birthdate = this.fb.control(null, Validators.required);
    address1 = this.fb.control(null);
    address2 = this.fb.control(null);
    city = this.fb.control(null);
    customField1 = this.fb.control(null, (c) => this.customFieldValidator(c, 1));
    customField2 = this.fb.control(null, (c) => this.customFieldValidator(c, 2));
    customField3 = this.fb.control(null, (c) => this.customFieldValidator(c, 3));
    customField4 = this.fb.control(null, (c) => this.customFieldValidator(c, 4));

    form = this.fb.group({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        birthdate: this.birthdate,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        customField1: this.customField1,
        customField2: this.customField2,
        customField3: this.customField3,
        customField4: this.customField4
    });
    
    constructor(
        public service: UserService, 
        public s: ConfigurationService,
        private notificationService: PushNotificationService,
        private router: Router, 
        private fb: FormBuilder) {

        this.getPushSubscription();
        service.getUser()
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
            if (user.address) {
                this.city.setValue(user.address.city);
                this.address1.setValue(user.address.addressLine1);
                this.address2.setValue(user.address.addressLine2);
            }
        }
    }

    logout() {
        this.service.logout();
        this.router.navigate(['/loyaltycard']);
    }

    saveUser() {
        this.loading = true;
        this.user.firstname = this.firstname.value;
        this.user.lastname = this.lastname.value;
        this.user.email = this.email.value;
        this.user.birthdate = this.birthdate.value;
        this.user.customField1 = this.customField1.value;
        this.user.customField2 = this.customField2.value;
        this.user.customField3 = this.customField3.value;
        this.user.customField4 = this.customField4.value;
        // if (this.city.value || this.address1.value || this.address2.value) {
        //     this.user.address = {
        //         country: {
        //             id: 'AE'
        //         },
        //         city: this.city.value,
        //         addressLine1: this.address1.value,
        //         addressLine2: this.address2.value
        //     };
        // }

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

    getPushSubscription() {
        console.log((<any>Notification).permission)
        getSubscription()
        .then(sub => {
            this.pushEnabled = sub !== null;
        });
    }

    pushSubscriptionChanged(checked) {
        this.pushEnabled = checked;
        if (this.pushEnabled) {
            subscribeUser()
            .then(sub => this.notificationService.savePushSubscription(sub))
            .catch(e => {
                if ((<any>Notification).permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                    this.pushEnabled = false;
                    this.notificationsDenied = true;
                    this.notificationService.savePushSubscription(null);
                }
            });
        }
        else {
            getSubscription()
            .then(sub => {
                if (sub) {
                    return sub.unsubscribe();
                }
            })
            .catch(e => console.log('Error unsubscribing', e))
            .then(() => this.notificationService.savePushSubscription(null));
        }
    }

    private customEmailValidator(control: AbstractControl): ValidationErrors {
        if (!control.value) {
            return null;
        }
        return Validators.email(control);
    }

    private customFieldValidator(control: AbstractControl, index:  number): ValidationErrors {
        if (this.s.customerCustomFields && this.s.customerCustomFields.length > index - 1) {
            var field = this.s.customerCustomFields[index - 1];
            if (field && field.mandatory && field.fieldType != 'checkbox') {
                return Validators.required(control);
            }
        }
        return null;
    }
}
