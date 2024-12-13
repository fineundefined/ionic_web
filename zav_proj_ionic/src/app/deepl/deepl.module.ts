import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeeplPageRoutingModule } from './deepl-routing.module';

import { DeeplPage } from './deepl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeeplPageRoutingModule
  ],
  declarations: [DeeplPage]
})
export class DeeplPageModule {}
