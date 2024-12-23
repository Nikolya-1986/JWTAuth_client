import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { IRoleCreate } from '../../core/interfaces/role-create.interface';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleService } from '../../core/services/role.service';
import { RoleListComponent } from './components/role-list/role-list.component';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RoleFormComponent, RoleListComponent, MatSnackBarModule, MatInputModule, MatSelectModule, AsyncPipe],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  roleServer = inject(RoleService);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  errorMessage = '';
  role: IRoleCreate = {} as IRoleCreate;
  roles$ = this.roleServer.getRoles();
  users$ = this.userService.getAll();
  selectedUser: string = '';
  selectedRole: string = '';

  private destroyRef = inject(DestroyRef);

  createRole(role: IRoleCreate): void {
    this.roleServer.createRole(role)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleServer.getRoles();
        this.snackBar.open('Role Created Seccessfuly', 'Ok', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errorMessage = err.error;
        }
      }
    })
  }

  onDeleteRole(id: string): void {
    this.roleServer.deleteRole(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        this.roles$ = this.roleServer.getRoles();
        this.snackBar.open('Role Delete Successfuly', 'Close', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Close', {
          duration: 5000,
        });
      }
    })
  }

  assignRole(): void {
    this.roleServer.assingeRole(this.selectedUser, this.selectedRole)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        this.roles$ = this.roleServer.getRoles();
        this.snackBar.open('Role Assign Successfuly', 'Close', {
          duration: 5000,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Close', {
          duration: 5000,
        });
      }
    })
  }

}
