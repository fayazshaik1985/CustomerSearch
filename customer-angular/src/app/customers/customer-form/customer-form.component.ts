import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerService = inject(CustomerService);
  
  id: string | null = null;
  form = this.fb.group({
    id: 0,
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    phone: [''],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.customerService.getCustomer(this.id).subscribe({
        next: (customer) => {
          this.form.patchValue({
            id: customer.id || 0,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || '',
            dateOfBirth: (customer.dateOfBirth || '').split('T')[0],
            phone: customer.phone || '',
          });
        },
      });
    }
  }

  handleSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.form.markAllAsTouched();
    
    if (this.form.invalid) {
      // Mark form as dirty to indicate user interaction
      this.form.markAsDirty();
      return;
    }
    
    const payload = this.form.value;
    const request$ = this.id
      ? this.customerService.updateCustomer(this.id, payload)
      : this.customerService.addCustomer(payload);
    request$.subscribe({ next: () => this.router.navigate(['/customers']) });
  }

  handleCancel(): void {
    this.router.navigate(['/customers']);
  }
}
