import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//user路由
import { UserRoutingModule } from './user-routing.module';

//user模块下的组件
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

//共享模块
import { SharedModule } from '../shared/shared.module';


import { PublishContentComponent } from '../news/pages/publish-content/publish-content.component';
import { NewsModule } from '../news/news.module';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BellComponent } from './pages/bell/bell.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserHomeComponent,
    InfoPageComponent,
    HomePageComponent,
    BellComponent,
    SettingPageComponent
    // PublishContentComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NewsModule,
  ],
  exports: []
})
export class UserModule { }
