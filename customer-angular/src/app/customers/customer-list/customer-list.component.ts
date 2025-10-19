import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Customer, CustomerService } from '../../../services/customer.service';
import { CustomerStoreService } from '../../store/customer/customer.store.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly customerStore = inject(CustomerStoreService);
  private readonly router = inject(Router);

  // Observable properties from store
  customers$: Observable<Customer[]> = this.customerStore.customers$;
  loading$: Observable<boolean> = this.customerStore.loading$;
  error$: Observable<string | null> = this.customerStore.error$;
  searchTerm$: Observable<string> = this.customerStore.searchTerm$;
  
  // Local properties for template binding  
  sortBy = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchQuery = '';
  
  ngOnInit(): void {
    //load customers only once (i.e., avoid duplicate API calls if data already exists in the store)
    
    //1. take(1) ensures the subscription completes after the first value.
    //2. Checks if customers array is empty or null.
    //3. Only calls loadCustomers() if the store has no data yet.

    this.customerStore.customers$
      .pipe(take(1)) // take the first emitted value and auto-unsubscribe
      .subscribe(customers => {
        if (!customers || customers.length === 0) {          
          this.customerStore.loadCustomers({sortBy: this.sortBy, sortOrder: this.sortOrder, search: this.searchQuery});
        }
      });
  }

  /*
    ngOnInit(): void {
      combineLatest([
        this.customerStore.filteredAndSortedCustomers$.pipe(take(1)),
        this.customerStore.loading$.pipe(take(1))
      ]).subscribe(([customers, loading]) => {
        if ((!customers || customers.length === 0) && !loading) {
          this.customerStore.loadCustomers();
        }
      });
    }
  */

  searchCustomers(): void {        
    this.customers$ =  this.customerService.getCustomers({ sortBy: this.sortBy, sortOrder: this.sortOrder, search: this.searchQuery });
  }
  
  handleSearch(): void {    
    this.searchCustomers();
  }

  handleSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.searchCustomers();
  }
  
  handleEditCustomer(customer: Customer): void {
    this.router.navigate(['/customer/edit', customer.id]);
  }

  handleDelete(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerStore.deleteCustomer(id);
    }
  }
}
