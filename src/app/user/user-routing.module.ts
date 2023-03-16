import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '../pages/not-found/not-found.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: UserHomeComponent
  },
  {
    path: 'userinfo', component: UserInfoComponent
  },
  {
    path: '**', component: NotFoundComponent
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
