import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular'
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router,private apiService: ApiService, private toastController:ToastController) {}

  login() {
    const userData = { email: this.email, password: this.password };
    this.apiService.login(userData).subscribe({
      next: (response) => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('userId', response.userId)
          localStorage.setItem('userName', response.userName)
          this.showNotification('Login succesful','success')
          this.router.navigate(['dashboard'])
        }
        
      },
      error: (error) => {
        this.showNotification('Login Failed: Incorrect email or password','danger')
        console.log('Login failed!',error);
      },
      complete: () => {
        
        console.log('Registration request completed');
      },
    });
  }

  async showNotification(message: string, color: string ) {
    const toast = await this.toastController.create({
      message,         
      duration: 3000,  
      position: 'bottom',
      color,
      buttons: [
        {
          text: 'Close', 
          role: 'cancel',
          handler: () => {
            toast.dismiss();
            console.log('Toast dismissed');
          } 
        }
      ]
    });
    await toast.present(); 
  }

}