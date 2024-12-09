import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { UserService } from '../service/user-service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User = new User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You need to log in to access the dashboard.');
      this.router.navigate(['/Login']);
    } else {
      this.loadDashboardData();
    }
  }

  loadDashboardData() {
    this.userService.dahsboard().subscribe({
      next: (response) => {
        console.log('Dashboard data:', response.data);
        this.user = response.data;
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
        alert(error.error?.message || 'Failed to load dashboard data.');
      },
    });
  }

  // Logout and clear token
  logout() {
    localStorage.removeItem('authToken');
    alert('You have been logged out.');
    this.router.navigate(['/Login']);
  }
}
