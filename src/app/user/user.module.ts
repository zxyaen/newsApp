import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//user路由
import { UserRoutingModule } from './user-routing.module';

//user模块下的组件
import { UserComponent } from './pages/user/user.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

//共享模块
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    LoginComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  exports: []
})
export class UserModule { }
