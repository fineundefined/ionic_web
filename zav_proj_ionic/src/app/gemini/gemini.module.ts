import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeminiPageRoutingModule } from './gemini-routing.module';

import { GeminiPage } from './gemini.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeminiPageRoutingModule
  ],
  declarations: [GeminiPage]
})
export class GeminiPageModule {}
