import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil, combineLatest } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CustomerStoreService } from '../../store/customer/customer.store.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerService = inject(CustomerService);
  private readonly customerStore = inject(CustomerStoreService);
  private readonly destroy$ = new Subject<void>();
  
  id: string | null = null;
  loading$: Observable<boolean> = this.customerStore.loading$;
  error$: Observable<string | null> = this.customerStore.error$;
  selectedCustomer$: Observable<any> = this.customerStore.selectedCustomer$;
  
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
      // Load customer from store
      this.customerStore.loadCustomer(this.id);
      
      // Subscribe to selected customer from store
      this.selectedCustomer$
        .pipe(takeUntil(this.destroy$))
        .subscribe(customer => {
          if (customer) {
            this.form.patchValue({
              id: customer.id || 0,
              firstName: customer.firstName || '',
              lastName: customer.lastName || '',
              email: customer.email || '',
              dateOfBirth: (customer.dateOfBirth || '').split('T')[0],
              phone: customer.phone || '',
            });
          }
        });
    }
    
    // Clear any previous errors
    this.customerStore.clearSelectedCustomer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Clear selected customer when leaving the form
    this.customerStore.clearSelectedCustomer();
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
    
    if (this.id) {
      // Update customer using store
      this.customerStore.updateCustomer(this.id, payload as any);
    } else {
      // Add customer using store
      this.customerStore.addCustomer(payload as any);
    }
    
    // Subscribe to loading state to navigate when operation completes
    this.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        if (!loading) {
          // Check if there's an error, if not navigate away
          this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
            if (!error) {
              this.router.navigate(['/customers']);
            }
          });
        }
      });
  }

  handleCancel(): void {
    this.router.navigate(['/customers']);
  }
}
