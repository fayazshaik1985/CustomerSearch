import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  @Output() collapsedStateChanged = new EventEmitter<boolean>();
  private readonly dataService: DataService = inject(DataService);
  // async pipe subscribes automatically
  //isLoggedIn$ = this.dataService.loggedIn$;  
  isCollapsed = false;
  
  navItems: NavItem[] = [];
   
  constructor(private router: Router) {}

  ngOnInit() {
        
    if(this.dataService.isLoggedIn){
      this.navItems = [
        { icon: '📊', label: 'Dashboard', route: '/dashboard', isActive: false },
        { icon: '👥', label: 'Customers', route: '/customers', isActive: false },
        { icon: '📦', label: 'Products', route: '/products', isActive: false },
        //{ icon: '➕', label: 'Add Customer', route: '/customer/add', isActive: false },
      ];

      this.updateActiveRoute();
      this.router.events.subscribe(() => {
        this.updateActiveRoute();
      });
    }
    
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedStateChanged.emit(this.isCollapsed);
  }

  private updateActiveRoute() {
    const currentRoute = this.router.url;
    this.navItems.forEach(item => {
      item.isActive = currentRoute === item.route;
    });
  }
}
