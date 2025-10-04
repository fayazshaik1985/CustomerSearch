 import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-angular';
  isSidenavCollapsed = false;
  dataService: DataService = inject(DataService);
  private subscription!: Subscription;
  isLoggedIn = false; 

  // async pipe subscribes automatically
  //isLoggedIn = this.dataService.loggedIn$;

  ngOnInit() {
     this.subscription = this.dataService.loggedIn$.subscribe(value => {      
      this.isLoggedIn = value;
    });
  }

  onSidenavCollapsedStateChanged(collapsed: boolean) {
    this.isSidenavCollapsed = collapsed;
  }

   ngOnDestroy() {
    // Prevent memory leaks
    this.subscription.unsubscribe();
  }

}
