import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() isSidenavCollapsed: boolean = false;
  private readonly router: Router = inject(Router);
  private readonly dataService: DataService = inject(DataService);
  private subscription!: Subscription;
  isLoggedIn = false;  
  userEmail: string = '';
  
  ngOnInit() {

     this.subscription = this.dataService.loggedIn$.subscribe(value => {
      this.userEmail = localStorage.getItem('email') || '';
      this.isLoggedIn = value;
    });

  }

  logout() {
    localStorage.removeItem('email');
    this.dataService.updateIsLoggedIn(false);
    this.router.navigate(['/login']);
  }
  
  ngOnDestroy() {
    // Prevent memory leaks
    this.subscription.unsubscribe();
  }
}
