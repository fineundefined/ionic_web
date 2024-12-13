import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeminiPage } from './gemini.page';

const routes: Routes = [
  {
    path: '',
    component: GeminiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeminiPageRoutingModule {}
