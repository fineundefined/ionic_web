import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGptPageRoutingModule } from './chat-gpt-routing.module';

import { ChatGptPage } from './chat-gpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGptPageRoutingModule
  ],
  declarations: [ChatGptPage]
})
export class ChatGptPageModule {}
