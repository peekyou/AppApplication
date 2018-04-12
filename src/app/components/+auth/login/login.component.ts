import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ConfigurationService } from '../../../core/services/configuration.service';
import { AuthService } from '../auth.service';
import { UserService } from '../../../core/services/user.service';
import { styleBackgoundImage } from '../../../core/helpers/utils';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    styleBackgoundImage: any;
    loading = false;
    isOtpStep = false;
    mobileError: boolean = false;
    codeError: boolean = false;
    firstname = this.fb.control(null, Validators.required);
    lastname = this.fb.control(null, Validators.required);
    mobile = this.fb.control(null, Validators.required);
    otpCode = this.fb.control(null, Validators.required);

    form = this.fb.group({
        // firstname: this.firstname,
        // lastname: this.lastname,
        mobile: this.mobile,
    });

    otpForm = this.fb.group({
        otpCode: this.otpCode
    });
     
    constructor(
        private fb: FormBuilder, 
        private authService: AuthService,
        private router: Router, 
        private userService: UserService,
        public s: ConfigurationService) { 

            this.styleBackgoundImage = styleBackgoundImage;
            if (authService.isAuthenticated()) {
                router.navigate(['/']);
            }
        }

    ngOnInit() {
        //this.authService.logout();
    }
    
    sendOptCode() {
        this.mobileError = false;
        this.loading = true;
        this.authService
            .sendOtpCode(this.mobile.value)
            .subscribe(res => {
                this.loading = false;
                this.isOtpStep = true;
            },
            err => {
                this.loading = false;
                this.mobileError = true;
            });
    }

    onOtpSubmit() {
        this.codeError = false;
        this.authService.login(this.firstname.value, this.lastname.value, this.mobile.value, this.otpCode.value)
            .subscribe(
            res => {
                this.userService.launchTimer();
                this.router.navigate(['/']);
            },
            err => this.codeError = true);
    }
}