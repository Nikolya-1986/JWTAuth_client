import { Routes } from '@angular/router';

import { ResetPasswordComponent } from './pages/auth/components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/auth/components/forget-password/forget-password.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleComponent } from './pages/role/role.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ChangePasswordComponent } from './pages/auth/components/change-password/change-password.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'account/:id',
        component: AccountComponent,
        canActivate: [authGuard],
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard],
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'roles',
        component: RoleComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    }
];
