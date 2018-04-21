import { NgModule } from '@angular/core';
import { SharedModule } from '../../core/shared/shared.module';

//import { ReCaptchaModule } from 'angular2-recaptcha';
import { LoginComponent } from './login/login.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { authRoutes } from './auth.routes';

@NgModule({
    imports: [
        SharedModule,
        authRoutes,
    ],
    declarations: [
        LoginComponent,
        OtpCodeComponent
    ]
})
export class AuthModule { }