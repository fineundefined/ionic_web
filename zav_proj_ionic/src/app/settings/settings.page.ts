import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {

    this.apiService.getUserProfile().subscribe({
      next: (response) => {
        this.user.name = response.name;
        this.user.email = response.email;
      },
      error: (error) => {
        console.error('Failed to load profile:', error);
      },
    });
  }

  updateProfile() {

    this.apiService.updateUserProfile(this.user).subscribe({
      next: () => {
        localStorage.setItem('userName', this.user.name)
        alert('Profile updated successfully');
      },
      error: (error) => {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile');
      },
    });
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.apiService.deleteUserAccount().subscribe({
        next: () => {
          alert('Account deleted successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Failed to delete account:', error);
          alert('Failed to delete account');
        },
      });
    }
  }
}
