
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  // authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }

  // logout = () => {
  //   this.authService.logout();
  //   this.matSnackBar.open('Logout success', 'Close', {
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //   });
  //   this.router.navigate(['/login']);
  // };
}
