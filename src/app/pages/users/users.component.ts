import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  userService = inject(UserService);
  users$ = this.userService.getAll();
}
