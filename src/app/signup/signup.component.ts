import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = new User();
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    this.isLoading = true;
    this.authService.signupUser(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Signup successful! Redirecting to login.');
        this.router.navigate(['/Login']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      },
      complete: () => {
        console.log('Signup request completed');
        this.isLoading = false;
      }
    });
  }
}
