import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.page.html',
  styleUrls: ['./chat-gpt.page.scss'],
})
export class ChatGptPage {
  messages: { text: string; User: string;IsUserMessage:boolean }[] = [];
  currentMessage: string = '';
  ModelType: string = 'chat-gpt';
  ModelName: string = 'ChatGpt'

  constructor(private apiService: ApiService) {}
  ionViewWillEnter() {
    this.loadMessagesFromLocalStorage();
  }
  sendMessage() {
    if (!this.currentMessage.trim()) return;

    this.messages.push({ text: this.currentMessage, User: localStorage.getItem('userName') || "User",IsUserMessage:true });

    this.apiService.sendMessage(this.currentMessage, this.ModelType).subscribe({
      next: (response) => {

        this.messages.push({ text: response.response, User: this.ModelName,IsUserMessage:false });


        this.saveMessagesToLocalStorage();
      },
      error: (error) => {

        this.messages.push({ text: 'Error: Unable to fetch response', User: this.ModelName,IsUserMessage:false });


        this.saveMessagesToLocalStorage();
      },
      complete: () => {
        console.log('Request completed');
      },
    });

    this.currentMessage = '';

    this.saveMessagesToLocalStorage();
  }

  saveMessagesToLocalStorage() {
    localStorage.setItem(`chat-history-${this.ModelType}`, JSON.stringify(this.messages));
  }

  loadMessagesFromLocalStorage() {
    const savedMessages = localStorage.getItem(`chat-history-${this.ModelType}`);
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.messages = [];
    }
  }
}
