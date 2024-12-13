import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userName: string | null = null;
  public appPages = [
    { title: 'ChatGPT', url: '/chat-gpt', icon: 'flame' },
    { title: 'Gemini', url: '/gemini', icon: 'sparkles' },
    { title: 'DeepL', url: '/deepl', icon: 'language' },
  ];
  public secondPages = [
    {title:'DashBoard', url:'/dashboard', icon:'cube'},
    {title:'AI News', url:'/news', icon:'newspaper'},
    {title:'Settings', url:'/settings', icon:'cog'},
    {title:'Privacy', url:'/privacy', icon:'shield-half'},
  ];
  constructor(private router: Router) {}
  loadUserName() {
    this.userName = localStorage.getItem('userName');
  }
  logout() {
    if(localStorage.getItem('access_token')){
      this.clearChatHistory();

      this.router.navigate(['/login']); 
    }
  }

  clearChatHistory() {
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userName'); 
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat-history-')) {
        localStorage.removeItem(key);
        i--;
      }
    }
  }
}
