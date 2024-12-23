import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IRole } from '../../../../core/interfaces/role.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  roles: InputSignal<IRole[] | null> = input.required({ alias: 'rolesInput' });

  deleteRole: OutputEmitterRef<string> = output();

  deleteRoleById(id: string): void {
    this.deleteRole.emit(id)
  }
}
