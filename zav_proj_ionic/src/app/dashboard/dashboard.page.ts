import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {


  constructor() {}


  public appPages = [
    {
      title: 'ChatGPT',
      description: ' Developed by OpenAI, ChatGPT is a generative AI chatbot based on the GPT-3.5 and GPT-4 large language models. It can generate human-like text, answer questions, and assist with various tasks. ChatGPT has been widely adopted across multiple industries for its versatility and effectiveness.',
      url: '/chat-gpt',
      imgi: '/assets/images/chatgpt.jpg'
    },
    {
      title: 'Gemini',
      description: ' Created by Meta AI, LLaMA (Large Language Model Meta AI) is a family of autoregressive large language models. The latest versions, LLaMA 3.1 and 3.2, were released in 2024. These models are designed to perform a variety of natural language processing tasks and are available in different parameter sizes to accommodate various applications.',
      url: '/gemini',
      imgi: 'assets/images/Gemini.jpg'
    },
    {
      title: 'Deepl',
      description: 'Translate texts & full document files instantly. Accurate translations for individuals and Teams. Millions translate with DeepL every day.',
      url: '/deepl',
      imgi: 'assets/images/Deepl.png'
    }
  ];
}
