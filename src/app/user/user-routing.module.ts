import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '../pages/not-found/not-found.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BellComponent } from './pages/bell/bell.component'

import { AuthGuard } from '../guards/auth-guard';
import { NewsInfoComponent } from '../news/pages/news-info/news-info.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: UserHomeComponent,
    children: [
      { path: 'infoPage', component: InfoPageComponent, canActivate: [AuthGuard] },
      { path: 'homepage', component: HomePageComponent, canActivate: [AuthGuard] },
      { path: 'newsInfoPage', component: NewsInfoComponent, canActivate: [AuthGuard] },
      { path: 'bellPage', component: BellComponent , canActivate: [AuthGuard]},
      { path: 'settingPage', component: SettingPageComponent , canActivate: [AuthGuard]},
    ], canActivate: [AuthGuard]

  },
  {
    path: '**', component: NotFoundComponent
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
