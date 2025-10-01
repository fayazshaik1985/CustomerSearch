import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);

  customers: any[] = [];
  loading = true;
  error: string | null = null;
  sortBy = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchQuery = '';

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.loading = true;
    this.customerService
      .getCustomers({ sortBy: this.sortBy, sortOrder: this.sortOrder, search: this.searchQuery })
      .subscribe({
        next: data => {
          this.customers = data;
          this.loading = false;
        },
        error: err => {
          this.error = (err as Error).message;
          this.loading = false;
        },
      });
  }

  handleSearch(): void {
    this.fetchCustomers();
  }

  handleSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.fetchCustomers();
  }

  handleEditCustomer(customer: any): void {
    this.router.navigate(['/customer/edit', customer.id]);
  }

  handleDelete(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.fetchCustomers(),
        error: err => (this.error = (err as Error).message),
      });
    }
  }
}
