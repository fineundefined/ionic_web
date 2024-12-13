import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService,private router: Router, private toastController: ToastController) {}

  register() {
    const userData = { email: this.email, password: this.password };
    this.apiService.register(userData).subscribe({
      next: (response) => {
        if(response){
          this.showNotification('Registration is succesful, you can login to your account','success');
          this.router.navigate(["login"])
        }
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.showNotification('Registration failed, credentials are not valid','danger');
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
