import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IResetPassword } from '../../../../core/interfaces/reset-password.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPassword = {} as IResetPassword;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  router = inject(Router);

  private destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.initializeQueryParams();
  }

  resetPasswordHandle(): void {
    this.authService.resetPassword(this.resetPassword)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
        });
      },
    });
  };

  private initializeQueryParams(): void {
    this.route.queryParams
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((params) => {
      this.resetPassword.email = params['email'];
      this.resetPassword.token = params['token'];
    });
  }
}
