import { UserService } from '../../core/services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  userService = inject(UserService);
  accountDetail$ = this.userService.getDetail();
}
