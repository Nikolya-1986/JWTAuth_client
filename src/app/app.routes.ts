import { Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
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
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    }
];
