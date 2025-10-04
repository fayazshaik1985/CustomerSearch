import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly dataService: DataService = inject(DataService);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  }); 

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email && email.trim().length > 0) {
      this.dataService.updateIsLoggedIn(true);

      if (window.location.pathname.includes('/login'))
        this.router.navigate(['/dashboard']);       
    }
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email as string;
    localStorage.setItem('email', email);
    this.dataService.updateIsLoggedIn(true);
    this.router.navigate(['/dashboard']);
  }
}


