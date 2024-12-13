import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deepl',
  templateUrl: './deepl.page.html',
  styleUrls: ['./deepl.page.scss'],
})
export class DeeplPage  {

 
  constructor(private apiService: ApiService,private router: Router ) { }
  ModelType: string = 'deepl'
  public Languages = [
    {
      title: 'Auto',
      code: 'auto_detect',
    },
    {
      title: 'English',
      code: 'EN',
    },
    {
      title: 'German',
      code: 'DE',
    },
    {
      title: 'French',
      code: 'FR',
    },
    {
      title: 'Spanish',
      code: 'ES',
    },
    {
      title: 'Portuguese',
      code: 'PT',
    },
    {
      title: 'Italian',
      code: 'IT',
    },
    {
      title: 'Dutch',
      code: 'NL',
    },
    {
      title: 'Polish',
      code: 'PL',
    },
    {
      title: 'Russian',
      code: 'RU',
    },
    {
      title: 'Japanese',
      code: 'JA',
    },
    {
      title: 'Chinese (Simplified)',
      code: 'ZH',
    },
    {
      title: 'Bulgarian',
      code: 'BG',
    },
    {
      title: 'Czech',
      code: 'CS',
    },
    {
      title: 'Danish',
      code: 'DA',
    },
    {
      title: 'Greek',
      code: 'EL',
    },
    {
      title: 'Estonian',
      code: 'ET',
    },
    {
      title: 'Finnish',
      code: 'FI',
    },
    {
      title: 'Hungarian',
      code: 'HU',
    },
    {
      title: 'Lithuanian',
      code: 'LT',
    },
    {
      title: 'Latvian',
      code: 'LV',
    },
    {
      title: 'Slovak',
      code: 'SK',
    },
    {
      title: 'Slovenian',
      code: 'SL',
    },
    {
      title: 'Swedish',
      code: 'SV',
    }
  ];
  
  selectedFromLanguage: string = 'auto_detect';
  selectedToLanguage: string = 'CS'; 
  messageToTranslate: string = "";
  translatedMessage: string = "";

  switchLang(){
    if(this.selectedFromLanguage != 'auto_detect'){
      [this.selectedFromLanguage , this.selectedToLanguage] = [this.selectedToLanguage,this.selectedFromLanguage];
      [this.messageToTranslate, this.translatedMessage] = [this.translatedMessage, this.messageToTranslate]
    
    }
  }

  isDisabledInTo(langCode: string): boolean {
    return langCode === this.selectedFromLanguage;
  }

  
  isDisabledInFrom(langCode: string): boolean {
    return langCode === this.selectedToLanguage;
  }
  translateMassage(){
    if (!this.messageToTranslate.trim()) return;

    this.apiService.translateMassage(this.messageToTranslate,this.selectedFromLanguage,this.selectedToLanguage, this.ModelType).subscribe({
      next: (response) => {
        this.translatedMessage=response.response
        this.selectedFromLanguage = response.detected_source_lang
      },
      error: (error) => {


        console.error(error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });


   
  }
}
