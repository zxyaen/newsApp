import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';

import { UserHomeComponent } from './pages/user-home/user-home.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';

const routes: Routes = [
  {
    path: 'home', component: UserHomeComponent
  },
  {
    path: 'userinfo', component: InfoPageComponent
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule { }
