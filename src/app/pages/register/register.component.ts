import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  fb = inject(FormBuilder);
  router = inject(Router);

  registerForm!: FormGroup;
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      fullName: ['', Validators.required, Validators.email],
      roles: [],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required, Validators.email],
    })
  }

}
