import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IRoleCreate } from '../../../../core/interfaces/role-create.interface';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  role: InputSignal<IRoleCreate> = input.required({ alias: 'roleInput' });
  errorMessage: InputSignal<string> = input.required({ alias: 'errorInput' });
  addRole: OutputEmitterRef<IRoleCreate> = output();

  add() {
    this.addRole.emit(this.role());
  }
}
