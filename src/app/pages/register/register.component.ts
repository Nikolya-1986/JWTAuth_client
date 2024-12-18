import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { Observable } from 'rxjs';
import { IRole } from '../../core/interfaces/role.interface';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidationError } from '../../core/interfaces/validation-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackbar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  router = inject(Router);

  registerForm!: FormGroup;
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  roles$!: Observable<IRole[]>;
  errors!: ValidationError[];
  private destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  register(): void {
    this.authService.register(this.registerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response:any) => {
          console.log(response)

          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['login'])
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.errors = err.error;
            this.matSnackbar.open('Validation error', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            })
          }
        },
        complete: () => console.log('Register success'),
      })
  }

  initializeRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', Validators.required, Validators.email],
        fullName: ['', Validators.required, Validators.email],
        roles: [],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required, Validators.email],
      },
      {
        validators: this.passworsMatchValidator,
      }
    );

    this.roles$ = this.roleService.getRoles();
  }

  private passworsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passworsMatch: true }
    }
    return null;
  }

}

