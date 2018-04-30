import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ConfigurationService } from '../../../core/services/configuration.service';
import { AuthService } from '../auth.service';
import { UserService } from '../../../core/services/user.service';
import { styleBackgoundImage } from '../../../core/helpers/utils';
import { formatPhone } from '../../../core/helpers/utils';

@Component({
    templateUrl: './otp-code.component.html',
    styleUrls: ['./otp-code.component.scss']
})
export class OtpCodeComponent implements OnInit {
    styleBackgoundImage: any;
    loading = false;
    codeError: boolean = false;
    otpCode = this.fb.control(null, Validators.required);

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
    }

    onOtpSubmit() {
        this.loading = true;
        this.codeError = false;
        this.authService.login(null, null, formatPhone(this.authService.mobile), this.otpCode.value)
            .subscribe(
            res => {
                this.loading = false;
                this.userService.launchTimer();
                this.router.navigate(['/']);
            },
            err =>  {
                this.codeError = true;
                this.loading = false;
            });
    }

    sendOptCode() {
        this.loading = true;
        this.authService
            .sendOtpCode(formatPhone(this.authService.mobile))
            .subscribe(res => {
                this.loading = false;
            },
            err => {
                this.loading = false;
            });
    }
}