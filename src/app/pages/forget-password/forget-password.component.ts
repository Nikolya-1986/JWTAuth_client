import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, DestroyRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  matSnackbar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  private destroyRef = inject(DestroyRef);
  
  forgetPassword() {
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackbar.open(error.message, 'Close', {
          duration: 5000,
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
