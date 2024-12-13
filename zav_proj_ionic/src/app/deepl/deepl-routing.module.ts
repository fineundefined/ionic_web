import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeeplPage } from './deepl.page';

const routes: Routes = [
  {
    path: '',
    component: DeeplPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeeplPageRoutingModule {}
