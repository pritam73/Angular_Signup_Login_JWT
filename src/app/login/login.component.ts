import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.authService.loginUser(this.user).subscribe({
      next: (response) => {
        console.log('User Login successfully:', response);
        if (response && response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        alert("Invalid Credentials")
        this.isLoading = false;
      }
    });
  }
}
