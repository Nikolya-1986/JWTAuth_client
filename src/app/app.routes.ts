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
