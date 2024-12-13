import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGptPage } from './chat-gpt.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGptPageRoutingModule {}
