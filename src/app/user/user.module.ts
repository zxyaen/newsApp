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
import { UserInfoComponent } from './pages/user-info/user-info.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserHomeComponent,
    UserInfoComponent,
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
