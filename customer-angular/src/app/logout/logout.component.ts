import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    localStorage.removeItem('email');
    setTimeout(() => this.router.navigate(['/login']), 1000);
  }
}


