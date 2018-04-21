import { LoginComponent } from './login/login.component';
import { OtpCodeComponent } from './otp-code/otp-code.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpCodeComponent }
];

export const authRoutes = RouterModule.forChild(routes);
